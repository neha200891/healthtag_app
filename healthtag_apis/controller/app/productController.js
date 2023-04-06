const { Sequelize } = require("sequelize");
const { dataNotFound, getPagingData } = require("../../helper/helperFunction");
const {
  Product,
  Category,
  ProductImages,
  CategoryQuestion,
  Cart,
  CartItem,
  Order,
  OrderItem,
  UserReview,
  QuestionnairesOption,
  User,
  Blog,
  DeviceConnection,
  MyDevices,
  ProductTypes,
  ServiceTax,
} = require("../../model");
const joi = require("joi");
const ProductType = require("../../model/ProductType");

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIP_SECRET_KEY);

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({ where: { status: "active" } });
    return res.status(200).json({
      status: true,
      message: "All Categories",
      data: categories,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getCategoryDetails = async (req, res, next) => {
  try {
    const categories = await Category.findOne({ where: { id: req.params.categoryId, status: "active" } });
    return res.status(200).json({
      status: true,
      message: " Category details",
      data: categories,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    let products;
    let limit = 10;
    let offset = 0 + (req.query.page - 1) * limit;
    if (req.query.categoryId) {
      products = await Product.findAndCountAll({
        where: { categoryId: req.query.categoryId, status: "active" },
        offset: offset,
        limit: limit,
        distinct: true,
        include: [
          { model: ProductImages, attributes: ["id", "image", "productId"] },
          { model: ProductType },
          { model: Category, attributes: ["id", "category"], where: { status: "active" } },
        ],
      });
    } else {
      products = await Product.findAndCountAll({
        where: { status: "active" },
        offset: offset,
        limit: limit,
        distinct: true,
        include: [
          { model: ProductImages, attributes: ["id", "image", "productId"] },
          { model: ProductType, attributes: ["id", "product_type"] },
          { model: Category, attributes: ["id", "category"], where: { status: "active" } },
        ],
      });
    }
    console.log("count prod", products.count);
    const newData = getPagingData(products, req.query.page, limit);
    return res.status(200).json({
      status: true,
      message: "All products",
      data: newData,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.productId },
      include: [
        { model: ProductImages, attributes: ["id", "image", "productId"] },
        { model: Category, attributes: ["id", "category"] },
        { model: ProductType, attributes: ["id", "product_type"] },
        {
          model: UserReview,
          include: [{ model: User, attributes: ["id", "first_name", "last_name", "profile_image", "email"] }],
        },
      ],
    });
    let product_rating = calculateAverageRating(product.user_reviews);
    product.dataValues.product_rating = product_rating;
    product.dataValues.total_reviews = (product.user_reviews && product.user_reviews.length) || 0;

    return res.status(200).json({
      status: true,
      message: "prduct detail",
      data: product,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getCategoryQuestion = async (req, res, next) => {
  try {
    const questions = await CategoryQuestion.findAll({
      where: { categoryId: req.params.categoryId, status: "active" },
      include: [{ model: QuestionnairesOption, where: { status: "active" } }],
    });
    if (questions && questions.length === 0) {
      return res.status(400).json({
        status: false,
        message: "No Question Found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Category Question",
      data: questions,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const product = await Product.findOne({ where: { id: productId } });
    const category = await Category.findOne({ where: { id: product.categoryId } });
    dataNotFound(product, "product not found", 404);

    const cart = await Cart.findOne({ where: { userId: req.userId } });
    const tax = await ServiceTax.findOne();
    if (cart) {
      const cartProduct = await CartItem.findOne({ where: { cartId: cart.id, productId: productId } });

      if (cartProduct) {
        const error = new Error("Product already in your cart");
        error.statusCode = 406;
        throw error;
      }
      let deliveryCharges = cart.delivery_charges
        ? cart.delivery_charges + product.delivery_rate
        : product.delivery_rate;
      const vat = ((cart.total + product.price) * tax.tax) / 100;
      cart.tax_amount = vat;
      cart.total = cart.total + product.price + deliveryCharges + vat;
      cart.delivery_charges = deliveryCharges;
      await cart.save();
      await cart.reload();
      await CartItem.create({
        quantity: 1,
        cartId: cart.id,
        productId: productId,
      });
    } else {
      const vat = (product.price * tax.tax) / 100;
      const cart = await Cart.create({
        userId: req.userId,
        delivery_charges: product.delivery_rate,
        total: product.price + product.delivery_rate + vat,
        tax_amount: vat,
      });
      await CartItem.create({
        quantity: 1,
        cartId: cart.id,
        productId: productId,
      });
    }
    return res.status(200).json({
      status: true,
      message: "Item added to cart",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.changeProductQuantity = async (req, res, next) => {
  try {
    const { cartId, productId, quantity } = req.body;
    const cart = await Cart.findOne({ where: { id: cartId } });
    const product = await Product.findOne({ where: { id: productId } });
    const cartItem = await CartItem.findOne({ where: { cartId: cartId, productId: productId } });
    const tax = await ServiceTax.findOne();
    if (quantity == 0) {
      cart.delivery_charges = cart.delivery_charges - product.delivery_rate;
      await cart.save();
      await cart.reload();
      await cartItem.destroy();
    } else {
      cartItem.quantity = quantity;

      await cartItem.save();
      await cartItem.reload();
    }

    let total = 0;
    let i = 0;
    let delivery_charges = 0;
    const cartItems = await CartItem.findAll({ where: { cartId: cartId } });
    while (i < cartItems.length) {
      let item = cartItems[i];
      let product = await Product.findOne({ where: { id: item.productId } });
      total = total + product.price * item.quantity;
      delivery_charges = delivery_charges + product.delivery_rate * item.quantity;
      i++;
    }
    const vat = (total * tax.tax) / 100;
    cart.total = total + delivery_charges + vat;
    cart.tax_amount = vat;
    cart.delivery_charges = delivery_charges;
    await cart.save();
    await cart.reload();
    if (cartItems.length == 0) {
      cart.destroy();
    }
    return res.status(200).json({
      status: true,
      message: "Item quantity changed",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteItemFromCart = async (req, res, next) => {
  try {
    const { cartId, productId } = req.body;
    const cart = await Cart.findOne({ where: { id: cartId } });
    const product = await Product.findOne({ where: { id: productId } });
    const tax = await ServiceTax.findOne();
    const cartItem = await CartItem.findOne({ where: { cartId: cartId, productId: productId } });

    await cartItem.destroy();

    let total = 0;
    let i = 0;
    let delivery_charges = 0;
    const cartItems = await CartItem.findAll({ where: { cartId: cartId } });
    while (i < cartItems.length) {
      let item = cartItems[i];
      let product = await Product.findOne({ where: { id: item.productId } });
      total = total + product.price * item.quantity;

      delivery_charges = delivery_charges + product.delivery_rate * item.quantity;
      i++;
    }
    const vat = (total * tax.tax) / 100;
    cart.tax_amount = vat;
    cart.total = total + delivery_charges + vat;
    cart.delivery_charges = delivery_charges;
    await cart.save();
    await cart.reload();
    if (cartItems.length == 0) {
      cart.destroy();
    }
    return res.status(200).json({
      status: true,
      message: "Item removed from cart",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.clearMyCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.userId },
    });
    CartItem.destroy({ where: { cartId: cart.id } });
    await cart.destroy();
    return res.status(200).json({
      status: true,
      message: "Cart is cleared",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getMyCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.userId },
      include: [
        {
          model: CartItem,
          attributes: ["id", "quantity", "cartId", "productId"],
          include: [
            {
              model: Product,
              attributes: ["id", "name", "price", "status", "delivery_rate"],
              include: [{ model: ProductImages, attributes: ["id", "image"] }],
            },
          ],
        },
      ],
    });
    if (cart) {
      return res.status(200).json({
        status: true,
        message: "User Cart",
        data: cart,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Cart is empty",
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.checkoutCartItem = async (req, res, next) => {
  try {
    const { cartId, addressId } = req.body;
    const cart = await Cart.findOne({ where: { id: cartId, userId: req.userId } });
    dataNotFound(cart, "cart not found", 404);
    const cartItems = await CartItem.findAll({
      where: { cartId: cartId },
      include: [
        {
          model: Product,
          attributes: ["id", "name", "price", "status"],
          include: [{ model: ProductImages, attributes: ["id", "image"] }],
        },
      ],
    });
    if (cartItems.length == 0) {
      const error = new Error("Please add products in your cart");
      error.statusCode = 404;
      throw error;
    }
    const order = await Order.create({
      total: cart.total,
      status: "pending",
      payment_id: null,
      mode: "card",
      tax_amount: cart.tax_amount,
      addressId: addressId,
      cardId: null,
      userId: req.userId,
      delivery_charges: cart.delivery_charges,
    });
    for (let i = 0; i < cartItems.length; i++) {
      await OrderItem.create({
        orderId: order.id,
        quantity: cartItems[i].quantity,
        productId: cartItems[i].productId,
        item_price: cartItems[i].product.price,
      });
    }

    console.log("checksum cart itesms");
    await CartItem.destroy({ where: { cartId: cartId } });
    await cart.destroy();
    return res.status(200).json({
      status: true,
      message: "Order Placed Successfully",
      data: order,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.checkoutCartItemMobile = async (req, res, next) => {
  try {
    const { cartId, addressId } = req.body;
    const cart = await Cart.findOne({ where: { id: cartId, userId: req.userId } });
    dataNotFound(cart, "cart not found", 404);
    const cartItems = await CartItem.findAll({
      where: { cartId: cartId },
      include: [
        {
          model: Product,
          attributes: ["id", "name", "price", "status"],
          include: [{ model: ProductImages, attributes: ["id", "image"] }],
        },
      ],
    });
    if (cartItems.length == 0) {
      const error = new Error("Please add products in your cart");
      error.statusCode = 404;
      throw error;
    }
    const order = await Order.create({
      total: cart.total,
      status: "pending",
      payment_id: null,
      mode: "card",
      tax_amount: cart.tax_amount,
      addressId: addressId,
      cardId: null,
      userId: req.userId,
      delivery_charges: cart.delivery_charges,
    });
    for (let i = 0; i < cartItems.length; i++) {
      await OrderItem.create({
        orderId: order.id,
        quantity: cartItems[i].quantity,
        productId: cartItems[i].productId,
        item_price: cartItems[i].product.price,
      });
    }

    await CartItem.destroy({ where: { cartId: cartId } });
    await cart.destroy();
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
    order.intantId = paymentIntent.client_secret;
    await order.save();
    await order.reload();

    return res.status(200).json({
      status: true,
      message: "Order Placed Successfully",
      data: order,
      payment_data: {
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey: process.env.STRIP_PUBLIC_KEY,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.getAllMyOrders = async (req, res, next) => {
  try {
    let where;
    if (req.query.status) {
      where = { userId: req.userId, status: req.query.status };
    } else {
      where = { userId: req.userId };
    }
    const orders = await Order.findAll({
      where: where,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: OrderItem,
          attributes: ["id", "quantity", "item_price", "orderId", "productId"],
          include: [
            {
              model: Product,
              attributes: ["id", "name", "status"],
              include: [{ model: ProductImages, attributes: ["id", "image"] }],
            },
          ],
        },
      ],
    });
    if (orders) {
      return res.status(200).json({
        status: true,
        message: "User Orders",
        data: orders,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "No Order Found",
        data: [],
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.buyNowProduct = async (req, res, next) => {
  try {
    const { productId, addressId, quantity } = req.body;
    const product = await Product.findOne({ where: { id: productId } });
    const tax = await ServiceTax.findOne();
    const vat = (product.price * tax.tax) / 100;
    let total = product.price + product.delivery_rate + vat;
    const order = await Order.create({
      total: total,
      tax_amount: vat,
      status: "pending",
      payment_id: null,
      mode: "card",
      delivery_charges: product.delivery_charges,
      userId: req.userId,
      addressId: addressId,
      cardId: null,
    });
    await OrderItem.create({
      orderId: order.id,
      quantity: quantity || 1,
      productId: product.id,
      item_price: product.price,
    });
    return res.status(200).json({
      status: true,
      message: "Order Placed Successfully",
      data: order,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.buyNowProductFromMobile = async (req, res, next) => {
  try {
    const { productId, addressId, quantity } = req.body;
    const product = await Product.findOne({ where: { id: productId } });
    const tax = await ServiceTax.findOne();
    const vat = (product.price * tax.tax) / 100;
    let total = product.price + product.delivery_rate || 0 + vat;
    console.log("total------------", total);
    const order = await Order.create({
      total: total,
      tax_amount: vat,
      status: "pending",
      payment_id: null,
      mode: "card",
      delivery_charges: product.delivery_charges,
      userId: req.userId,
      addressId: addressId,
      cardId: null,
    });
    await OrderItem.create({
      orderId: order.id,
      quantity: quantity || 1,
      productId: product.id,
      item_price: product.price,
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
    order.intantId = paymentIntent.client_secret;
    await order.save();
    await order.reload();

    return res.status(200).json({
      status: true,
      message: "Order Placed Successfully",
      data: order,
      payment_data: {
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey: process.env.STRIP_PUBLIC_KEY,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.changeUserOrderStatus = async (req, res, next) => {
  try {
    console.log("req body", res.userId);
    const order = await Order.findOne({ where: { id: req.body.orderId, userId: req.userId } });
    dataNotFound(order, "Data not found", 401);
    order.status = req.body.status;
    order.payment_id = req.body.payment_id;
    await order.save();
    await order.reload();
    return res.status(200).json({
      status: true,
      message: "Order Status changed",
      data: order,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.dashboardData = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: Sequelize.literal("rand()"),
      limit: 5,
      include: [
        { model: ProductImages, attributes: ["id", "image", "productId"] },
        { model: ProductType, attributes: ["id", "product_type"] },
        { model: Category, attributes: ["id", "category"], where: { status: "active" } },
      ],
    });

    const blogs = await Blog.findAll({
      order: Sequelize.literal("rand()"),
      limit: 5,
    });

    return res.status(200).json({
      status: true,
      message: "Dashboard data",
      data: { products, blogs },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getRecomendedProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: Sequelize.literal("rand()"),
      limit: 5,
      include: [
        { model: ProductImages, attributes: ["id", "image", "productId"] },
        { model: ProductType, attributes: ["id", "product_type"] },
        { model: Category, attributes: ["id", "category"], where: { status: "active" } },
      ],
    });

    return res.status(200).json({
      status: true,
      message: "Your recommended products",
      data: products,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.AddUserReview = async (req, res, next) => {
  try {
    const schema = joi.object({
      productId: joi.number().required(),
      rating: joi.string().valid("1", "2", "3", "4", "5").required(),
      review: joi.string().required(),
    });
    await schema.validateAsync(req.body);
    const checkReview = await UserReview.findOne({ productId: req.body.productId, userId: req.userId });
    if (checkReview) {
      const error = new Error("You have already given your review on this product");
      error.statusCode = 401;
      throw error;
    }
    const review = await UserReview.create({
      productId: req.body.productId,
      userId: req.userId,
      rating: req.body.rating,
      review: req.body.review,
    });
    return res.status(200).json({
      status: true,
      message: "Thanks for you review",
      data: review,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getServiceTax = async (req, res, next) => {
  try {
    const tax = await ServiceTax.findOne();
    return res.status(200).json({
      status: true,
      message: "Tax Added",
      data: tax,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

function calculateAverageRating(ratings) {
  let sum = 0;
  for (let i = 0; i < ratings.length; i++) {
    sum += parseInt(ratings[i].rating);
  }
  return sum / ratings.length;
}
