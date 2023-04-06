const User = require("../../model/user");
const { uploadFile, removeFile } = require("../../helper/File");
const joi = require("joi");
const bcrypt = require("bcryptjs");
const CryptoJS = require("crypto-js");
const { dataNotFound, getPagingData } = require("../../helper/helperFunction");
const {
  UserAddress,
  ProviderProfile,
  MyCustomers,
  ProviderSpecialities,
  Category,
  TenantProfile,
  UserPayment,
  QuestionnairesResult,
  QuestionnairesOption,
  CategoryQuestion,
  Language,
  OrderItem,
  Product,
  ProductImages,
  MyDevices,
  DeviceConnection,
  ProductSerial,
  ProductTypes,
  UserReport,
} = require("../../model");
const { Op, where } = require("sequelize");

exports.editUserProfile = async (req, res, next) => {
  const schema = joi.object({
    first_name: joi.string().optional(),
    last_name: joi.string().optional(),
    email: joi.string().optional(),
    profile_image: joi.string().optional(),
    phone_no: joi.string().optional(),
    gender: joi.string().allow("male", "female", "other").optional(),
    height1: joi.string().optional(),
    height2: joi.string().optional(),
    height_msr: joi.string().optional(),
    weight: joi.string().optional(),
    weight_msr: joi.string().optional(),
    languageId: joi.string().optional(),
  });

  let uploadfile;
  try {
    const { body, file } = await uploadFile(req, "images/users");
    await schema.validateAsync(req.body);
    uploadfile = file;
    console.log(req.body);
    const user = await User.findOne({ where: { id: req.userId } });
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
      data: user,
      message: "Profile Updated Successfully",
    });
  } catch (err) {
    if (uploadfile && uploadFile.path) {
      removeFile(uploadfile.path);
    }
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editUserProfileById = async (req, res, next) => {
  const schema = joi.object({
    first_name: joi.string().optional(),
    last_name: joi.string().optional(),
    email: joi.string().optional(),
    profile_image: joi.string().optional(),
    age: joi.number().required(),
    phone_no: joi.string().required(),
    gender: joi.string().allow("male", "female", "other").required(),
    height1: joi.string().optional(),
    height2: joi.string().optional(),
    height_msr: joi.string().optional(),
    weight: joi.string().optional(),
    weight_msr: joi.string().optional(),
    languageId: joi.string().optional(),
  });

  let uploadfile;
  try {
    const { body, file } = await uploadFile(req, "images/users");
    await schema.validateAsync(req.body);
    uploadfile = file;
    console.log(req.body);
    const user = await User.findOne({ where: { id: req.params.userId } });
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
      data: user,
      message: "Signup Successfully",
    });
  } catch (err) {
    if (uploadfile && uploadFile.path) {
      removeFile(uploadfile.path);
    }
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.changeUserPassword = async (req, res, next) => {
  const schema = joi.object({
    oldPassword: joi.string().required(),
    newPassword: joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    const user = await User.findOne({ where: { id: req.userId } });
    let comparePassword = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!comparePassword) {
      const error = new Error("Old Password is wrong");
      error.statusCode = 401;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);
    user.password = hashedPassword;
    user.save();
    res.status(200).json({
      status: true,
      message: "Password Changed Successfully",
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
    const user = await User.findOne({ where: { id: req.userId }, include: [{ model: Language, as: "Language" }] });
    dataNotFound(user, "User Not Found", 401);
    res.status(200).json({
      status: true,
      message: "User Profile",
      data: user,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addUserAddress = async (req, res, next) => {
  const schema = joi.object({
    address: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
    zipcode: joi.string().required(),
    latitude: joi.string().optional(),
    longitude: joi.string().optional(),
    default_address: joi.boolean().optional(),
    address_type: joi.string().optional(),
  });
  try {
    await schema.validateAsync(req.body);
    const create = new Object();
    create.address = req.body.address;
    create.city = req.body.city;
    create.state = req.body.state;
    create.zipcode = req.body.zipcode;
    create.default_address = req.body.default_address;
    create.address_type = req.body.address_type;
    create.userId = req.userId;
    create.latitude = req.body.latitude || null;
    create.longitude = req.body.longitude || null;
    const address = await UserAddress.create(create);
    res.status(200).json({
      status: true,
      message: "User address added",
      data: address,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editUserAddress = async (req, res, next) => {
  const schema = joi.object({
    address: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
    zipcode: joi.string().required(),
    latitude: joi.string().optional(),
    longitude: joi.string().optional(),
    default_address: joi.boolean().optional(),
    address_type: joi.string().optional(),
    addressId: joi.number().required(),
  });
  try {
    await schema.validateAsync(req.body);
    const address = await UserAddress.findOne({ where: { id: req.body.addressId, userId: req.userId } });
    dataNotFound(address, "data not found", 401);
    address.address = req.body.address;
    address.city = req.body.city;
    address.state = req.body.state;
    address.zipcode = req.body.zipcode;
    address.default_address = req.body.default_address;
    address.address_type = req.body.address_type;
    address.latitude = req.body.latitude || null;
    address.longitude = req.body.longitude || null;
    await address.save();
    await address.reload();
    res.status(200).json({
      status: true,
      message: "User address Edited",
      data: address,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteMyAddress = async (req, res, next) => {
  try {
    const address = await UserAddress.destroy({ where: { id: req.params.addressId, userId: req.userId } });
    res.status(200).json({
      status: true,
      message: "User address deletd",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getMyAddresses = async (req, res, next) => {
  try {
    const address = await UserAddress.findAll({ where: { userId: req.userId } });
    dataNotFound(address, "data Not Found", 401);
    res.status(200).json({
      status: true,
      message: "User address",
      data: address,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.submitCategoryQuestions = async (req, res, next) => {
  const TODAY_START = new Date().setHours(0, 0, 0, 0);
  const NOW = new Date();
  try {
    const { questionId, optionId, categoryId } = req.body;
    const findData = await QuestionnairesResult.findOne({
      where: {
        questionId: questionId,
        userId: req.userId,
        optionId: optionId,
        categoryId: categoryId,
        createdAt: {
          [Op.gt]: TODAY_START,
          [Op.lt]: NOW,
        },
      },
    });
    if (findData) {
      const error = new Error("You have already submitted answer for this question today");
      error.statusCode = 401;
      throw error;
    }
    let attemptNo = 1;
    const getAttempt = await QuestionnairesResult.findOne({
      where: {
        questionId: questionId,
        userId: req.userId,
        optionId: optionId,
        categoryId: categoryId,
      },
    });
    if (getAttempt) {
      attemptNo = attemptNo + 1;
    }
    const getQuestion = await CategoryQuestion.findOne({ where: { categoryId: categoryId, id: questionId } });
    if (!getQuestion) {
      const error = new Error("No question found for this category");
      error.statusCode = 401;
      throw error;
    }
    if (getQuestion.ques_type == "radio") {
      const catAnswer = await QuestionnairesResult.create({
        questionId: questionId,
        optionId: optionId,
        userId: req.userId,
        attemptNo: attemptNo,
        categoryId: categoryId,
      });
      return res.status(200).json({
        status: true,
        message: "Answer submitted",
      });
    } else {
      let option = JSON.parse(optionId);
      let i = 0;
      while (i < option.length) {
        const catAnswer = await QuestionnairesResult.create({
          questionId: questionId,
          optionId: option[i],
          userId: req.userId,
          attemptNo: attemptNo,
          categoryId: categoryId,
        });
        i++;
      }
      return res.status(200).json({
        status: true,
        message: "Answer submitted",
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getQuestionariesResult = async (req, res, next) => {
  try {
    const getResult = await QuestionnairesResult.findAll({
      where: { categoryId: req.params.categoryId, userId: req.userId },
      include: [{ model: QuestionnairesOption }],
    });
    let score = 0;
    let i = 0;
    while (i < getResult.length) {
      let item = getResult[i];
      score = item.questionnaires_option.score + score;
      i++;
    }

    let category = await Category.findOne({ where: { id: req.params.categoryId } });
    let resultType = "";
    if (score <= category.red_zone) {
      resultType = "red";
    } else if (score <= category.yellow_zone && score > category.red_zone) {
      resultType = "yellow";
    } else if (score > category.yellow_zone || score == category.green_zone) {
      resultType = "green";
    }

    return res.status(200).json({
      status: true,
      message: "Your Result",
      data: { score, resultType },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllProviders = async (req, res, next) => {
  try {
    let where;
    if (req.query.name) {
      where = {
        userType: "health_provider",
        status: "active",
        [Op.or]: [{ first_name: { [Op.like]: "%" + req.query.name + "%" } }],
      };
    } else {
      where = {
        userType: "health_provider",
        status: "active",
      };
    }
    const getProviders = await User.findAll({
      attributes: ["id", "first_name", "last_name", "email", "phone_no", "userType", "profile_image"],
      where: where,
      include: [
        {
          model: ProviderProfile,
          attributes: [
            "id",
            "business_name",

            "incorporation_year",
            "certification_number",
            "contact_person",
            "userId",
            "tenantId",
          ],
        },
        {
          model: ProviderSpecialities,
          attributes: ["id", "userId", "categoryId"],
          include: [
            { model: Category, where: { status: "active" }, attributes: ["id", "category", "short_desc", "image"] },
          ],
        },
      ],
    });
    const myProviders = await MyCustomers.findAll({
      where: { customerId: req.userId },
    });
    let ids = new Set(myProviders.map(({ providerId }) => providerId));
    let allProviders = getProviders.filter(({ id }) => !ids.has(id));

    return res.status(200).json({
      status: true,
      message: "All Providers List",
      data: allProviders,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.connectToProviders = async (req, res, next) => {
  try {
    const checkUser = await MyCustomers.findOne({ where: { customerId: req.userId, providerId: req.body.providerId } });
    if (checkUser) {
      let error = new Error("You are already connected to this provider");
      error.statusCode = 401;
      throw error;
    }
    let provider = await ProviderProfile.findOne({ where: { userId: req.body.providerId } });
    const customers = await MyCustomers.findAll({ where: { tenantId: provider.tenantId } });
    const totalUsers = await TenantProfile.findOne({ where: { userId: provider.tenantId } });

    if (customers.length + 1 > totalUsers.users) {
      const error = new Error("This Business customer limit is full, You can not connect to this business");
      error.statusCode = 401;
      throw error;
    }

    await MyCustomers.create({
      customerId: req.userId,
      providerId: req.body.providerId,
      tenantId: provider.tenantId,
    });
    return res.status(200).json({
      status: true,
      message: "Connected to provider successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.removeMyProvider = async (req, res, next) => {
  try {
    const myCustomer = await MyCustomers.findOne({
      where: { customerId: req.userId, providerId: req.body.providerId },
    });
    dataNotFound(myCustomer, "Data not found", 401);
    myCustomer.destroy();
    return res.status(200).json({
      status: true,
      message: "Your health provider is removed",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getMyProvider = async (req, res, next) => {
  try {
    const myCustomer = await MyCustomers.findOne({
      where: { customerId: req.userId },
    });
    dataNotFound(myCustomer, "Data not found", 401);
    const profile = await User.findOne({
      where: { id: myCustomer.providerId },
      include: [{ model: ProviderProfile }],
    });
    return res.status(200).json({
      status: true,
      message: "Your Provider",
      data: profile,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getProviderProfileENC = async (req, res, next) => {
  try {
    let encProvider = JSON.parse(decryptData(req.body.payload));
    console.log("encProvider", encProvider);
    let provider = await User.findOne({
      attributes: ["id", "first_name", "last_name", "email", "phone_no", "userType", "profile_image"],
      where: { id: encProvider.providerId },
      include: [
        {
          model: ProviderProfile,
          attributes: [
            "id",
            "business_name",
            "qr_code",
            "incorporation_year",
            "certification_number",
            "contact_person",
            "userId",
            "tenantId",
          ],
        },
        {
          model: ProviderSpecialities,
          attributes: ["id", "userId", "categoryId"],
          include: [
            { model: Category, where: { status: "active" }, attributes: ["id", "category", "short_desc", "image"] },
          ],
        },
      ],
    });
    return res.status(200).json({
      status: true,
      message: "Provider Profile",
      data: provider,
    });
  } catch (err) {
    console.log("errr--", err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addUserPaymentMethod = async (req, res, next) => {
  try {
    const schema = joi.object({
      name_on_card: joi.string().required(),
      card_no: joi.string().required(),
      month: joi.string().required(),
      year: joi.string().required(),
      cvv: joi.string().required(),
    });
    await schema.validateAsync(req.body);
    const payment = await UserPayment.create({
      name_on_card: req.body.name_on_card,
      card_no: req.body.card_no,
      month: req.body.month,
      year: req.body.year,
      cvv: req.body.cvv,
      userId: req.userId,
    });
    return res.status(200).json({
      status: true,
      message: "Payment method added",
      data: payment,
    });
  } catch (err) {
    console.log("errr--", err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.removePaymentMethod = async (req, res, next) => {
  try {
    const payment = await UserPayment.destroy({ where: { id: req.params.paymentId, userId: req.userId } });
    return res.status(200).json({
      status: true,
      message: "Payment method removed",
    });
  } catch (err) {
    console.log("errr--", err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getMyPayments = async (req, res, next) => {
  try {
    const payment = await UserPayment.findAll({ where: { userId: req.userId } });
    return res.status(200).json({
      status: true,
      message: "Payment methods",
      data: payment,
    });
  } catch (err) {
    console.log("errr--", err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllLanguages = async (req, res, next) => {
  try {
    const language = await Language.findAll();
    return res.status(200).json({
      status: true,
      message: "languages",
      data: language,
    });
  } catch (err) {
    console.log("errr--", err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.searchProductBySerialNumber = async (req, res, next) => {
  try {
    const sno = await ProductSerial.findOne({ where: { product_sno: req.body.product_sno } });
    const orderItem = await OrderItem.findOne({ where: { id: sno.orderItemId } });
    dataNotFound(orderItem, "Data not found", 401);
    const product = await Product.findOne({
      where: { id: orderItem.productId },
      include: [
        { model: ProductImages },
        { model: ProductTypes, attributes: ["id", "product_type"] },
        { model: Category, attributes: ["id", "category"], where: { status: "active" } },
      ],
    });
    return res.status(200).json({
      status: true,
      message: "Product details",
      data: product,
    });
  } catch (err) {
    console.log("errr--", err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addMyDevices = async (req, res, next) => {
  try {
    let product;
    const { product_sno, nick_name, bootId, deviceId, protocol_Name } = req.body;
    // const product = await OrderItem.findOne({ where: { product_sno: product_sno } });
    if (
      bootId.toLowerCase() == "so" ||
      bootId.toLowerCase() == "sm" ||
      bootId.toLowerCase() == "sx" ||
      bootId.toLowerCase() == "se" ||
      bootId.toLowerCase() == "sc"
    ) {
      const productType = await ProductTypes.findOne({ where: { id: 2 } });
      product = await Product.findOne({ where: { productTypeId: productType.id } });
    } else if (bootId.toLowerCase() == "berrymed") {
      const productType = await ProductTypes.findOne({ where: { id: 1 } });
      product = await Product.findOne({ where: { productTypeId: productType.id } });
    }
    const create = new Object();
    create.product_sno = product_sno;
    create.nick_name = nick_name;
    create.productId = product.id;
    create.userId = req.userId;
    create.bootId = bootId;
    create.deviceId = deviceId;
    create.protocol_Name = protocol_Name;
    const device = await MyDevices.create(create);
    return res.status(200).json({
      status: true,
      message: "Device Added",
      data: device,
    });
  } catch (err) {
    console.log("errr--", err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.getMyDevices = async (req, res, next) => {
  try {
    const myDevices = await MyDevices.findAll({
      where: { userId: req.userId },
      include: [{ model: Product, include: [{ model: ProductImages }] }],
    });
    return res.status(200).json({
      status: true,
      message: "My Devices ",
      data: myDevices,
    });
  } catch (err) {
    console.log("errr--", err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteMyDevice = async (req, res, next) => {
  try {
    const product = await MyDevices.findOne({ where: { id: req.params.deviceId, userId: req.userId } });

    dataNotFound(product, "data not found", 401);

    await product.destroy();
    return res.status(200).json({
      status: true,
      message: "Device deleted ",
    });
  } catch (err) {
    console.log("errr--", err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addDeviceConnectionTime = async (req, res, next) => {
  try {
    const device = await DeviceConnection.create({
      deviceId: req.body.deviceId,
      userId: req.userId,
      status: req.body.status,
    });
    return res.status(200).json({
      status: true,
      message: "Time saved",
      data: device,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getDeviceConnectionList = async (req, res, next) => {
  let limit = 10;
  let offset = 0 + (req.query.page - 1) * limit;
  try {
    const device = await DeviceConnection.findAndCountAll({
      where: {
        userId: req.userId,
      },
      offset: offset,
      limit: limit,
      distinct: true,
      include: [{ model: MyDevices }],
      order: [["createdAt", "DESC"]],
    });

    let i = 0;
    while (i < device.rows.length) {
      let item = device.rows[i];
      let image = await ProductImages.findOne({
        where: { productId: item && item.MyDevice && item.MyDevice.productId },
      });
      if (image.image) {
        item.MyDevice.dataValues.image = image.image;
      }
      i++;
    }

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

exports.saveMyReportData = async (req, res, next) => {
  const { chart_type, report_data, graph_data, myDeviceId, productId } = req.body;

  try {
    const userReport = await UserReport.create({
      chart_type: chart_type,
      report_data: report_data,
      graph_data: graph_data,
      userId: req.userId,
      myDeviceId: myDeviceId,
      productId: productId,
    });
    return res.status(200).json({
      status: true,
      message: "Report saved",
      // data: userReport,
    });
  } catch (err) {
    console.log("err", err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getMyReportData = async (req, res, next) => {
  let limit = 10;
  let offset = 0 + (req.query.page - 1) * limit;
  try {
    const device = await UserReport.findAndCountAll({
      where: {
        userId: req.userId,
        myDeviceId: req.params.myDeviceId,
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

const decryptData = (encrypted) => {
  const key = "HEALTHTAGQRCODEKEY";
  const decryptedMessage = CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);
  return decryptedMessage;
};
