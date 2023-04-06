const { dataNotFound } = require("../../helper/helperFunction");
const { Plan, UserSubscription } = require("../../model");

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIP_SECRET_KEY);
exports.purchasePlan = async (req, res, next) => {
  try {
    const plan = await Plan.findOne({
      where: {
        id: req.body.planId,
      },
    });
    dataNotFound(plan, "Plan Not Found", 401);
    const userSubscription = await UserSubscription.findOne({
      where: {
        userId: req.userId,
        status: "active",
      },
    });
    if (userSubscription) {
      const error = new Error("Plan Already Purchased");
      error.statuscode = 401;
      throw error;
    }
    let userSubscriptions = await UserSubscription.create({
      userId: req.userId,
      planId: req.body.planId,
      transection_id: null,
      status: "pending",
      end_date: new Date(new Date().setDate(new Date().getDate() + plan.days)),
      total: plan.price,
    });
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create({ customer: customer.id }, { apiVersion: "2022-11-15" });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.total * 100),
      currency: "usd",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    userSubscriptions.transection_id = paymentIntent.client_secret;
    await userSubscription.save();
    await userSubscription.reload();
    return res.status(201).json({
      status: true,
      message: "Plan Purchased Successfully",
      data: userSubscriptions,
      payment_data: {
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey: process.env.STRIP_PUBLIC_KEY,
      },
    });
  } catch (err) {
    console.log(err);
    if (!err.statuscode) {
      err.statuscode = 500;
    }
    next(err);
  }
};

exports.getMyPurchasedPlans = async (req, res, next) => {
  try {
    let plans = await UserSubscription.findAll({
      where: { userId: req.userId },
      include: [{ model: Plan }],
    });
    return res.status(200).json({
      status: true,
      message: "Plans Fetched Successfully",
      data: plans,
    });
  } catch (err) {
    if (!err.statuscode) {
      err.statuscode = 500;
    }
    next(err);
  }
};

exports.getAllPlans = async (req, res, next) => {
  try {
    let plans = await Plan.findAll({
      where: { status: "active" },
    });
    return res.status(200).json({
      status: true,
      message: "Plans Fetched Successfully",
      data: plans,
    });
  } catch (err) {
    if (!err.statuscode) {
      err.statuscode = 500;
    }
    next(err);
  }
};
