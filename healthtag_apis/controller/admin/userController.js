const User = require("../../model/user");
const { dataNotFound, getPagingData } = require("../../helper/helperFunction");
const { uploadFile, removeFile } = require("../../helper/File");
const AdminPassword = require("../../model/adminPassword");
const ejs = require("ejs");
const path = require("path");
const mailer = require("../../helper/mailHelper");
const config = require("config");
const UserOtp = require("../../model/userOtp");
const {
  TenantProfile,
  ProviderProfile,
  MyCustomers,
  ProviderSpecialities,
  Category,
  Order,
  OrderItem,
  Product,
  ProductImages,
  UserAddress,
  UserPayment,
  ProductSerial,
  UserSubscription,
  Plan,
  MyDevices,
  SupportTicket,
  UserReport,
} = require("../../model");
const { Op } = require("sequelize");
const sequelize = require("../../database/util");
exports.getAllUsers = async (req, res, next) => {
  try {
    let users = await User.findAll({
      where: { [Op.or]: [{ userType: "user" }, { userType: "health_provider" }] },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({
      status: true,
      message: "Users Found",
      data: users,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUserProfile = async (req, res, next) => {
  try {
    let business_profile;
    let user = await User.findOne({
      where: { id: req.params.id },
      include: {
        model: AdminPassword,
      },
    });
    if (user.userType === "tenant") {
      let tenant = await TenantProfile.findOne({
        where: { userId: user.id },
      });
      user.dataValues.business_profile = tenant;
    } else if (user.userType === "health_provider") {
      let health_provider = await ProviderProfile.findOne({
        where: { userId: user.id },
        include: [
          {
            model: User,
            as: "tenant",
            attributes: ["id"],
            include: [{ model: TenantProfile, attributes: ["id", "business_name"] }],
          },
        ],
      });
      let specialities = await ProviderSpecialities.findAll({
        where: { userId: user.id },
        include: [{ model: Category, attributes: ["id", "category"] }],
      });
      let customers = await MyCustomers.findAll({
        where: { providerId: user.id },
        include: [{ model: User, attributes: ["first_name", "last_name", "email", "id"], as: "customer" }],
      });
      user.dataValues.customers = customers;
      user.dataValues.business_profile = health_provider;
      user.dataValues.specialities = specialities;
    } else {
      let customer = await MyCustomers.findOne({
        where: { customerId: user.id },
        include: [
          {
            model: User,
            as: "provider",
            attributes: ["id"],
            include: [{ model: ProviderProfile, attributes: ["business_name"] }],
          },
          {
            model: User,
            as: "Tenant",
            attributes: ["id"],
            include: [{ model: TenantProfile, attributes: ["business_name"] }],
          },
        ],
      });
      user.dataValues.customer = customer;
    }
    dataNotFound(user, "User Not Found", 401);
    res.status(200).json({
      status: true,
      message: "User Found",
      data: user,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editUserProfileAdmin = async (req, res, next) => {
  let uploadfile;
  try {
    const { body, file } = await uploadFile(req, "images/users");
    uploadfile = file;
    const user = await User.findOne({ where: { id: req.params.id } });
    if (user.profile_image && file.path) {
      removeFile(user.profile_image);
    }
    if (file) {
      user.profile_image = file.path;
    }
    for (let key in body) {
      user[key] = body[key];
    }
    user.save();
    user.reload();
    res.status(200).json({
      status: true,
      message: "Profile Updated Successfully",
    });
  } catch (err) {
    removeFile(uploadfile.path);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.changeUserStatus = async (req, res, next) => {
  const { userId, status } = req.body;
  try {
    let user = await User.findOne({ where: { id: userId } });
    dataNotFound(user, "User Not Found", 401);
    let message;
    let emailMessage = "";
    if (status == "blocked") {
      message = "User Blocked Successfully";
      emailMessage = `We have to inform you that your account has been blocked by healthtag admin.
            If You have any questions please contact us at info@healthtag.com`;
    } else if (status == "active") {
      message = "User Actived Successfully";
      emailMessage = `Congratulation! Your account is verified and actived by admin.
            You can now login to your account.
            `;
    }

    user.status = status;
    user.save();
    user.reload();
    const mailData = await ejs.renderFile(path.join(__dirname, "../../view/accountVerification.ejs"), {
      name: user.fullname,
      message: emailMessage,
    });
    await mailer.sendEmail(user.email, config.get("App.email"), "Health Tag ACCOUNT STATUS", mailData);
    res.status(200).json({
      status: true,
      message: message,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.latestCreatedUser = async (req, res, next) => {
  try {
    let users = await User.findAll({
      order: [["createdAt", "DESC"]],
      limit: 1,
    });

    return res.status(200).json({
      status: true,
      message: "Latest Created User",
      data: users,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.lastLoggedInUsersList = async (req, res, next) => {
  try {
    let users = await User.findAll({
      order: [["updatedAt", "DESC"]],
      where: { userType: "user" },
      limit: 3,
    });

    res.status(200).json({
      status: true,
      data: users,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ where: { id: req.params.id } });
    dataNotFound(user, "User Not Found", 401);
    if (user.profile_image) {
      removeFile(user.profile_image);
    }
    await AdminPassword.destroy({ where: { userId: req.params.id } });

    await UserOtp.destroy({ where: { userId: req.params.id } });
    user.destroy();
    res.status(200).json({
      status: true,
      message: "User Deleted Successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllTenants = async (req, res, next) => {
  try {
    const tenant = await User.findAll({ where: { userType: "tenant" }, include: [{ model: TenantProfile }] });
    return res.status(200).json({
      status: true,
      message: "All Tanents",
      data: tenant,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllTenantProviders = async (req, res, next) => {
  try {
    const tenantProviders = await ProviderProfile.findAll({
      where: { tenantId: req.params.tenantId },
      include: [{ model: User }],
    });
    return res.status(200).json({
      status: true,
      message: "All Tanents Providers",
      data: tenantProviders,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllHealthProviders = async (req, res, next) => {
  try {
    let userId = req.userId;
    const checkProvider = await User.findOne({ where: { id: req.userId } });
    if (checkProvider.userType == "health_provider") {
      const checkAdmin = await ProviderProfile.findOne({ where: { userId: req.userId } });
      if (checkAdmin.is_admin == false) {
        const error = new Error("You dont have access to perform this action");
        error.statusCode = 401;
        throw error;
      } else {
        userId = checkAdmin.tenantId;
      }
    }
    const tenant = await User.findAll({
      where: { userType: "health_provider" },
      include: [{ model: ProviderProfile, where: { tenantId: userId } }],
    });
    return res.status(200).json({
      status: true,
      message: "All Tanents",
      data: tenant,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllTenantCustomers = async (req, res, next) => {
  try {
    let userId = req.userId;
    const checkProvider = await User.findOne({ where: { id: req.userId } });
    if (checkProvider.userType == "health_provider") {
      const checkAdmin = await ProviderProfile.findOne({ where: { userId: req.userId } });
      if (checkAdmin.is_admin == false) {
        const error = new Error("You dont have access to perform this action");
        error.statusCode = 401;
        throw error;
      } else {
        userId = checkAdmin.tenantId;
      }
    }
    const tenantUser = await User.findAll({
      where: { userType: "health_provider" },
      attributes: ["id"],
      include: [
        { model: ProviderProfile, attributes: ["userId", "id", "business_name"], where: { tenantId: userId } },
        {
          model: MyCustomers,
          as: "provider",
          include: [{ model: User, as: "customer" }],
        },
      ],
    });
    const providerCustomers = await MyCustomers.findAll({
      include: [
        { model: User, as: "customer" },
        {
          model: User,
          as: "provider",
          attributes: ["id"],
          include: [
            { model: ProviderProfile, attributes: ["userId", "id", "business_name"], where: { tenantId: userId } },
          ],
        },
      ],
    });
    return res.status(200).json({
      status: true,
      message: "All Tanents",
      data: providerCustomers,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.getAllProviderCustomers = async (req, res, next) => {
  try {
    let userId = req.userId;

    const providerCustomers = await MyCustomers.findAll({
      where: { providerId: userId },
      include: [
        { model: User, as: "customer" },
        {
          model: User,
          as: "provider",
          attributes: ["id"],
          include: [
            { model: ProviderProfile, attributes: ["userId", "id", "business_name"], where: { userId: userId } },
          ],
        },
      ],
    });
    return res.status(200).json({
      status: true,
      message: "All Tanents",
      data: providerCustomers,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editCustomerDetails = async (req, res, next) => {
  try {
    let myCustomer = await MyCustomers.findOne({ where: { customerId: req.body.customerId } });
    if (myCustomer) {
      myCustomer.tenantId = req.body.tenantId;
      myCustomer.providerId = req.body.providerId;
      await myCustomer.save();
      await myCustomer.reload();
    } else {
      myCustomer = await MyCustomers.create({
        customerId: req.body.customerId,
        tenantId: req.body.tenantId,
        providerId: req.body.providerId,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Customer Edited ",
      data: myCustomer,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editHealthProviderProfile = async (req, res, next) => {
  try {
    let providerProfile = await ProviderProfile.findOne({ where: { userId: req.body.providerId } });
    for (let key in req.body) {
      providerProfile[key] = req.body[key];
    }
    await providerProfile.save();
    await providerProfile.reload();
    return res.status(200).json({
      status: true,
      message: "Health Provider Edited ",
      data: providerProfile,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.changeCustomerTanency = async (req, res, next) => {
  try {
    const customers = JSON.parse(req.body.customers);
    const providerId = req.body.providerId;
    const tenantId = req.body.tenantId;
    for (let i = 0; i < customers.length; i++) {
      await MyCustomers.update({ providerId: providerId }, { where: { customerId: customers[i], tenantId: tenantId } });
    }
    return res.status(200).json({
      status: true,
      message: "Customer update to new provider",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        { model: OrderItem },
        { model: User, attributes: ["id", "first_name", "last_name", "profile_image", "email", "phone_no"] },
      ],
    });
    return res.status(200).json({
      status: true,
      message: "All Orders",
      data: orders,
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
    const orders = await Order.findOne({
      where: { id: req.params.orderId },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: OrderItem,
          include: [{ model: Product, include: [{ model: ProductImages }] }, { model: ProductSerial }],
        },
        { model: User },
        { model: UserAddress },
        { model: UserPayment },
      ],
    });
    return res.status(200).json({
      status: true,
      message: "All Orders",
      data: orders,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.changeOrderStatus = async (req, res, next) => {
  try {
    const { orderId, expected_delivery_date, tracking_id, delivery_partner, tracking_url, status } = req.body;
    const obj = {
      ...(expected_delivery_date && { expected_delivery_date: expected_delivery_date }),
      ...(tracking_id && { tracking_id: tracking_id }),
      ...(delivery_partner && { delivery_partner: delivery_partner }),
      ...(tracking_url && { tracking_url: tracking_url }),
      status: status,
    };
    console.log("check update state", obj);
    const order = await Order.update(obj, { where: { id: orderId } });
    return res.status(200).json({
      status: true,
      message: "Order status updated",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addSerialNumbers = async (req, res, next) => {
  try {
    const orderItems = JSON.parse(req.body.orderItems);
    let i = 0;
    while (i < orderItems.length) {
      let item = orderItems[i];
      await ProductSerial.create({
        product_sno: item.product_sno,
        userId: item.userId,
        orderItemId: item.orderItemId,
      });
      i++;
    }
    return res.status(200).json({
      status: true,
      message: "Order  updated",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.makeProviderAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.userId } });
    if (user.userType != "tenant") {
      const error = new Error("You dont have access to perform this action");
      error.statusCode = 401;
      throw error;
    }
    const providerProfile = await ProviderProfile.findOne({
      where: {
        userId: req.body.providerId,
        tenantId: req.userId,
      },
    });
    dataNotFound(providerProfile, 401, "data not found");
    providerProfile.is_admin = !providerProfile.is_admin;
    await providerProfile.save();
    await providerProfile.reload();
    return res.status(200).json({
      status: true,
      message: "Admin access changed",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      order: [["createdAt", "DESC"]],
      where: { userId: req.params.userId },
      include: [{ model: OrderItem, include: [{ model: Product, include: [{ model: ProductImages }] }] }],
    });
    return res.status(200).json({
      status: true,
      message: "All User Orders",
      data: orders,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUserSubscriptions = async (req, res, next) => {
  try {
    const subscription = await UserSubscription.findAll({
      where: { userId: req.params.userId },
      include: [Plan],
    });
    return res.status(200).json({
      status: true,
      message: "All User Subscription",
      data: subscription,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUserConnectedDevices = async (req, res, next) => {
  try {
    const devices = await MyDevices.findAll({
      where: { userId: req.params.userId },
      include: [{ model: Product, include: [{ model: ProductImages }] }],
    });
    return res.status(200).json({
      status: true,
      message: "All User Subscription",
      data: devices,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUserReportData = async (req, res, next) => {
  let limit = 10;
  let offset = 0 + (req.query.page - 1) * limit;
  try {
    const device = await UserReport.findAndCountAll({
      where: {
        userId: req.query.userId,
        myDeviceId: req.query.myDeviceId,
      },

      offset: offset,
      limit: limit,
      distinct: true,
      include: [{ model: MyDevices }, { model: Product }],
      order: [["createdAt", "DESC"]],
    });

    const newData = getPagingData(device, req.query.page, limit);
    return res.status(200).json({
      status: true,
      message: "Connected Device Data",
      data: newData,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.adminDashboard = async (req, res, next) => {
  try {
    // "user", "tenant", "health_provider"
    const revenueFromProducts = await Order.sum("total", { where: { status: { [Op.ne]: "pending" } } });
    const revenueFromSubscription = await UserSubscription.sum("total", { where: { status: { [Op.ne]: "pending" } } });
    const totalUsers = await User.count({ where: { userType: "user", status: "active" } });
    const totalTenants = await User.count({ where: { userType: "tenant", status: "active" } });
    const totalProviders = await User.count({ where: { userType: "health_provider", status: "active" } });
    const supportRequest = await SupportTicket.count({ where: { status: "open" } });
    let counts = {
      revenueFromProducts,
      revenueFromSubscription,
      totalUsers,
      totalTenants,
      totalProviders,
      supportRequest,
    };
    const latestOrders = await Order.findAll({
      where: { status: "amount_paid" },
      order: [["createdAt", "DESC"]],
      limit: 5,
      include: [
        { model: OrderItem },
        { model: User, attributes: ["id", "first_name", "last_name", "profile_image", "email", "phone_no"] },
      ],
    });
    const topUsers = await User.findAll({
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "profile_image",
        [sequelize.literal("(SELECT SUM(total) FROM orders WHERE orders.userId = users.id)"), "total"],
      ],
      limit: 5,
      order: [[sequelize.literal("total"), "DESC"]],
    });
    const topProducts = await Product.findAll({
      include: [{ model: ProductImages }],
      attributes: [
        "id",
        "name",
        "price",
        [sequelize.literal("(SELECT SUM(quantity) FROM order_item WHERE order_item.productId = products.id)"), "total"],
      ],
      limit: 5,
      order: [[sequelize.literal("total"), "DESC"]],
    });
    const topPlan = await Plan.findAll({
      attributes: [
        "id",
        "planName",
        "price",
        "image",
        "days",
        [
          sequelize.literal("(SELECT COUNT(*) FROM user_subscriptions WHERE user_subscriptions.planId = plan.id)"),
          "total",
        ],
      ],
      order: [[sequelize.literal("total"), "DESC"]],
    });

    return res.status(200).json({
      status: true,
      message: "admin dashboard",
      data: {
        counts,
        latestOrders,
        topUsers,
        topPlan,
        topProducts,
      },
    });
  } catch (err) {
    console.log("err", err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
