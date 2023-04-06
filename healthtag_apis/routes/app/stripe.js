const { Product, ServiceTax, Order, UserSubscription } = require("../../model");
const express = require("express");
const router = require("express").Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIP_SECRET_KEY);
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const YOUR_DOMAIN = "https://dev-healthtag-webapp.flynautstaging.com";
const isAuth = require("../../middleware/isAuth");

router.get("/get-stripe-key", isAuth, async (req, res, next) => {
  try {
    return res.status(200).json({
      status: true,
      message: "Stripe Secret Key",
      data: process.env.STRIP_SECRET_KEY,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

router.post("/create-checkout-session", async (req, res, next) => {
  try {
    let line_items = [];
    let shipping_options = [];
    let i = 0;
    let cart;
    const tax = await ServiceTax.findOne();
    const taxRate = await stripe.taxRates.create({
      // Here
      display_name: "Sales Tax",
      percentage: tax.tax,
      inclusive: false,
    });
    if (req.body.productId) {
      const product = await Product.findOne({ where: { id: req.body.productId } });
      line_items.push({
        price_data: {
          currency: "usd",
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name: product.name,
            // images: [product && product.productimages && product.productimages[0].image],
          },
        },
        quantity: 1,
        tax_rates: [taxRate.id],
      });
      shipping_options = [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: Math.round(product.delivery_rate * 100),
              currency: "usd",
            },

            display_name: "HealthTag",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
      ];
    } else {
      cart = JSON.parse(req.body.cart);
      const CartItems = cart.CartItems;
      while (i < CartItems.length) {
        let item = CartItems[i];
        line_items.push({
          price_data: {
            currency: "usd",
            unit_amount: Math.round(item.product.price * 100),

            product_data: {
              name: item.product.name,
              images: [item.product && item.product.productimages && item.product.productimages[0].image],
            },
          },
          quantity: item.quantity,
          tax_rates: [taxRate.id],
        });
        i++;
      }
      shipping_options = [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: Math.round(cart.delivery_charges * 100),
              currency: "usd",
            },

            display_name: "HealthTag",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
      ];
    }
    console.log("shipiiing option", shipping_options);
    const session = await stripe.checkout.sessions.create({
      shipping_options: shipping_options,
      line_items: line_items,
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/success-page?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/error-page?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.send({ url: session.url });
  } catch (err) {
    console.log("err", err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

router.get("/get-transection-details/:transectionId", async (req, res, next) => {
  try {
    const transaction = await stripe.checkout.sessions.retrieve(req.params.transectionId);

    return res.status(200).json({
      status: true,
      message: "Transection Details",
      data: transaction,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

const endpointSecret = "whsec_nXljqByHmmhJnVeFg7ZVGNgbWEybzEQh";

router.post("/webhook", async (request, response, next) => {
  const sig = request.headers["stripe-signature"];

  let event = request.body;
  console.log(event.type);

  try {
    console.log("try");
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.log("catch", err);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  console.log("switch case", event.type);
  switch (event.type) {
    case "payment_intent.payment_failed":
      const paymentIntentPaymentFailed = event.data.object;
      let orders = await Order.findOne({ where: { intantId: paymentIntentPaymentFailed.client_secret } });
      if (orders) {
        orders.status = "failed";
        orders.payment_id = paymentIntentPaymentFailed.id;
        await orders.save();
        await orders.reload();
      } else {
      }

      // Then define and call a function to handle the event payment_intent.payment_failed
      break;
    case "payment_intent.processing":
      const paymentIntentProcessing = event.data.object;
      console.log("paymentIntentProcessing", paymentIntentProcessing);
      // Then define and call a function to handle the event payment_intent.processing
      break;
    case "payment_intent.succeeded":
      console.log("payment success");
      const paymentIntentSucceeded = event.data.object;
      console.log("paymentIntentSucceeded", paymentIntentSucceeded);
      let order = await Order.findOne({ where: { intantId: paymentIntentSucceeded.client_secret } });
      if (order) {
        order.status = "amount_paid";
        order.payment_id = paymentIntentSucceeded.id;
        await order.save();
        await order.reload();
      } else {
        let userSubs = await UserSubscription.findOne({
          where: { transection_id: paymentIntentSucceeded.client_secret },
        });
        userSubs.status = "inactive";
        userSubs.transection_id = paymentIntentSucceeded.id;
        await userSubs.save();
        await userSubs.reload();
      }

      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

module.exports = router;
