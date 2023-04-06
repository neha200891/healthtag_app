const joi = require("joi");
const User = require("../../model/user");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const config = require("config");
const jwt = require("jsonwebtoken");
const { dataNotFound } = require("../../helper/helperFunction");
const UserOtp = require("../../model/userOtp");
const ejs = require("ejs");
const path = require("path");
const mailer = require("../../helper/mailHelper");
const { uploadFile, removeFile } = require("../../helper/File");
const AdminPassword = require("../../model/adminPassword");
const qrcode = require("qrcode");
const { Master, TenantProfile, ProviderProfile, ProviderSpecialities, MyCustomers } = require("../../model");
const CryptoJS = require("crypto-js");
exports.createUserAccount = async (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    phone_no: joi.string().required(),
    age: joi.number().required(),
    gender: joi.string().required(),
    tenantId: joi.number().required(),
    providerId: joi.number().required(),
  });
  let uploadfile;
  try {
    const { body, file } = await uploadFile(req, "images/users");
    uploadfile = file;
    await schema.validateAsync(req.body);
    const customers = await MyCustomers.findAll({ where: { tenantId: req.body.tenantId } });
    const totalUsers = await TenantProfile.findOne({ where: { userId: req.body.tenantId } });
    if (customers.length + 1 > totalUsers.users) {
      const error = new Error("This tenant customer limit is full, You can not add more customers in it");
      error.statusCode = 401;
      throw error;
    }
    let user = await User.findOne({ where: sequelize.or({ email: req.body.email }, { phone_no: req.body.phone_no }) });
    if (user) {
      const error = new Error("Email/Mobile Already Exist");
      error.statusCode = 401;
      throw error;
    }
    const create = new Object();
    for (let key in req.body) {
      create[key] = req.body[key];
    }
    if (file) {
      create.profile_image = file.path;
    }
    create["status"] = "active";
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(create["password"], 12);
      create["password"] = hashedPassword;
    }
    user = await User.create(create);
    await MyCustomers.create({
      tenantId: req.body.tenantId,
      providerId: req.body.providerId,
      customerId: user.id,
    });
    await savePasswordForAdmin(user.id, req.body.password);
    const mailData = await ejs.renderFile(path.join(__dirname, "../../view/newUser.ejs"), {
      password: req.body.password,
      name: req.body.first_name,
    });
    await mailer.sendEmail(user.email, config.get("App.email"), "Health Tag NEW ACCOUNT", mailData);
    return res.status(201).json({
      status: true,
      message: "User Created Successfully",
      data: user,
    });
  } catch (err) {
    removeFile(uploadfile.path);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.adminLogin = async (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    let user = await User.findOne({
      where: {
        email: req.body.email,
        [Op.or]: [{ userType: "admin" }, { userType: "tenant" }, { userType: "health_provider" }],
      },
    });

    dataNotFound(user, "User Not Found", 401);
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      const error = new Error("Password Incorrect");
      error.statusCode = 401;
      throw error;
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    let userOtp = new UserOtp();
    userOtp.userId = user.id;
    userOtp.otp = otp;
    userOtp.otp_type = "Login";
    var expired_at = new Date();
    expired_at.setMinutes(expired_at.getMinutes() + 30);
    userOtp.expired_at = expired_at;
    await userOtp.save();
    await userOtp.reload();
    const mailData = await ejs.renderFile(path.join(__dirname, "../../view/loginOTP.ejs"), {
      otp: otp,
      name: user.first_name,
    });
    await mailer.sendEmail(user.email, config.get("App.email"), "Health Tag LOGIN OTP", mailData);
    res.status(200).json({
      status: true,
      message: "An OTP has been sent to your email  " + otp,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const savePasswordForAdmin = async (userId, password) => {
  let adminPassword = await AdminPassword.findOne({ where: { userId: userId } });
  if (adminPassword) {
    adminPassword.pass = password;
    await adminPassword.save();
  } else {
    let adminPasswords = new AdminPassword();
    adminPasswords.userId = userId;
    adminPasswords.pass = password;
    await adminPasswords.save();
  }
};

exports.createMasters = async (req, res, next) => {
  const schema = joi.object({
    health_providers: joi.number().required(),
    users: joi.number().required(),
  });
  try {
    await schema.validateAsync(req.body);
    const master = await Master.findOne();
    if (master) {
      master.health_providers = req.body.health_providers;
      master.users = req.body.users;
      await master.save();
      await master.reload();
    } else {
      await Master.create({
        health_providers: req.body.health_providers,
        users: req.body.users,
      });
    }
    return res.status(200).json({
      status: true,
      message: "Master Added Successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createTanentProfile = async (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    phone_no: joi.string().required(),
    address: joi.string().required(),
    business_name: joi.string().required(),
    incorporation_year: joi.string().required(),
    certification_number: joi.string().required(),
    contact_person: joi.string().required(),
    health_providers: joi.number().required(),
    users: joi.number().required(),
  });
  try {
    await schema.validateAsync(req.body);

    let user = await User.findOne({ where: sequelize.or({ email: req.body.email }, { phone_no: req.body.phone_no }) });
    if (user) {
      const error = new Error("Email/Mobile Already Exist");
      error.statusCode = 401;
      throw error;
    }
    const create = new Object();
    create.email = req.body.email;
    create.phone_no = req.body.phone_no;
    create.address = req.body.address;
    create.password = req.body.password;
    create.userType = "tenant";
    create["status"] = "active";
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(create["password"], 12);
      create["password"] = hashedPassword;
    }
    user = await User.create(create);
    await savePasswordForAdmin(user.id, req.body.password);
    const business = new Object();
    business.business_name = req.body.business_name;
    business.incorporation_year = req.body.incorporation_year;
    business.contact_person = req.body.contact_person;
    business.certification_number = req.body.certification_number;
    business.health_providers = req.body.health_providers;
    business.users = req.body.users;
    business.userId = user.id;
    await TenantProfile.create(business);
    const mailData = await ejs.renderFile(path.join(__dirname, "../../view/newUser.ejs"), {
      password: req.body.password,
      name: req.body.business_name,
    });
    await mailer.sendEmail(user.email, config.get("App.email"), "Health Tag NEW ACCOUNT", mailData);
    return res.status(201).json({
      status: true,
      message: "Tenant Created Successfully",
      data: user,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createProviderProfile = async (req, res, next) => {
  const schema = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    phone_no: joi.string().required(),
    address: joi.string().required(),
    business_name: joi.string().required(),
    incorporation_year: joi.string().required(),
    certification_number: joi.string().required(),
    contact_person: joi.string().required(),
    provider_specialities: joi.string().required(),
  });
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
    await schema.validateAsync(req.body);
    let user = await User.findOne({ where: sequelize.or({ email: req.body.email }, { phone_no: req.body.phone_no }) });
    if (user) {
      const error = new Error("Email/Mobile Already Exist");
      error.statusCode = 401;
      throw error;
    }
    const create = new Object();
    create.first_name = req.body.first_name;
    create.last_name = req.body.last_name;
    create.email = req.body.email;
    create.phone_no = req.body.phone_no;
    create.address = req.body.address;
    create.password = req.body.password;
    create.userType = "health_provider";
    create["status"] = "active";
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(create["password"], 12);
      create["password"] = hashedPassword;
    }

    user = await User.create(create);
    await savePasswordForAdmin(user.id, req.body.password);
    let qrData = {
      providerId: user.id,
    };
    let hashId = encryptData(JSON.stringify(qrData));
    console.log("hash id", hashId);
    let stringQRData = JSON.stringify(hashId);
    const generatedCode = await qrcode.toDataURL(stringQRData);
    const business = new Object();
    business.business_name = req.body.business_name;
    business.incorporation_year = req.body.incorporation_year;
    business.contact_person = req.body.contact_person;
    business.certification_number = req.body.certification_number;
    business.health_providers = req.body.health_providers;
    business.users = req.body.health_providers;
    business.userId = user.id;
    business.tenantId = userId;
    business.qr_code = generatedCode;
    await ProviderProfile.create(business);
    let providerSpecialities = JSON.parse(req.body.provider_specialities);

    let i = 0;
    while (i < providerSpecialities.length) {
      await ProviderSpecialities.create({
        userId: user.id,
        categoryId: providerSpecialities[i],
      });
      i++;
    }
    const mailData = await ejs.renderFile(path.join(__dirname, "../../view/newUser.ejs"), {
      password: req.body.password,
      name: req.body.business_name,
    });
    await mailer.sendEmail(user.email, config.get("App.email"), "Health Tag NEW ACCOUNT", mailData);
    return res.status(201).json({
      status: true,
      message: "Health Provider Created Successfully",
      data: user,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getMasters = async (req, res, next) => {
  try {
    const master = await Master.findOne();
    return res.status(201).json({
      status: true,
      message: "Master Data",
      data: master,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const encryptData = (data) => {
  const key = "HEALTHTAGQRCODEKEY";
  const encryptedMessage = CryptoJS.AES.encrypt(data, key).toString();
  return encryptedMessage;
};

exports.updateProviderQRCode = async (req, res, next) => {
  try {
    const provider = await User.findOne({ where: { id: req.params.providerId } });
    let qrData = {
      providerId: provider.id,
    };
    let hashId = encryptData(JSON.stringify(qrData));

    let stringQRData = JSON.stringify(hashId);
    const generatedCode = await qrcode.toDataURL(stringQRData);
    const providerProfile = await ProviderProfile.findOne({ where: { userId: provider.id } });

    providerProfile.qr_code = generatedCode;
    await providerProfile.save();
    await providerProfile.reload();
    return res.status(201).json({
      status: true,
      message: "QR Updated",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
