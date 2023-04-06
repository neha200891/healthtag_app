const User = require("../../model/user");
const { dataNotFound } = require("../../helper/helperFunction");
const UserOtp = require("../../model/userOtp");
const ejs = require("ejs");
const path = require("path");
const mailer = require("../../helper/mailHelper");
const config = require("config");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const bcrypt = require("bcryptjs");
const AdminPassword = require("../../model/adminPassword");
const { ProviderProfile } = require("../../model");

exports.webLogin = async (req, res, next) => {
  const schema = joi
    .object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    })
    .options({ allowUnknown: true });

  try {
    await schema.validateAsync(req.body);
    let user = await User.findOne({ where: { email: req.body.email } });
    dataNotFound(user, "User Not Found", 401);
    // if (await user.status === "pending") {
    //     const error = new Error("User is not verified");
    //     error.statusCode = 401;
    //     throw error;
    // }
    if ((await user.status) === "blocked") {
      const error = new Error("User is blocked");
      error.statusCode = 401;
      throw error;
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      const error = new Error("Password Incorrect");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id,
      },
      config.get("App.JwtKey")
    );
    user.token = token;
    user.fcm_token = req.body.fcm_token;
    user.device_type = req.body.device_type;
    user.updatedAt = new Date();
    if (req.body.fcm_token) {
      user.fcm_token = req.body.fcm_token;
    }
    if (req.body.device_type) {
      user.device_type = req.body.device_type;
    }
    if (req.body.device_model) {
      user.device_model = req.body.device_model;
    }
    if (req.body.timezone) {
      user.timezone = req.body.timezone;
    }

    await user.save();
    await user.reload();

    res.status(200).json({
      status: true,
      message: "Login Successfully",
      data: user,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.userLogin = async (req, res, next) => {
  const schema = joi
    .object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    })
    .options({ allowUnknown: true });

  try {
    await schema.validateAsync(req.body);
    let user = await User.findOne({ where: { email: req.body.email } });
    dataNotFound(user, "User Not Found", 401);
    // if (await user.status === "pending") {
    //     const error = new Error("User is not verified");
    //     error.statusCode = 401;
    //     throw error;
    // }
    if ((await user.status) === "blocked") {
      const error = new Error("User is blocked");
      error.statusCode = 401;
      throw error;
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      const error = new Error("Password Incorrect");
      error.statusCode = 401;
      throw error;
    }
    // const token = jwt.sign(
    //   {
    //     email: user.email,
    //     userId: user.id,
    //   },
    //   config.get("App.JwtKey")
    // );
    // user.token = token;
    user.fcm_token = req.body.fcm_token;
    user.device_type = req.body.device_type;
    user.updatedAt = new Date();
    if (req.body.fcm_token) {
      user.fcm_token = req.body.fcm_token;
    }
    if (req.body.device_type) {
      user.device_type = req.body.device_type;
    }
    if (req.body.device_model) {
      user.device_model = req.body.device_model;
    }
    if (req.body.timezone) {
      user.timezone = req.body.timezone;
    }

    await user.save();
    await user.reload();
    const otp = Math.floor(1000 + Math.random() * 9000);
    // const otp = 123456;
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
      message: "An Otp send to your email please check",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.resendLoginOTP = async (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
  });
  try {
    await schema.validateAsync(req.body);
    let user = await User.findOne({ where: { email: req.body.email } });
    dataNotFound(user, "User Not Found", 401);
    const otp = Math.floor(1000 + Math.random() * 9000);
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
      message: "An OTP has been sent to your email",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.checkOtpLogin = async (req, res, next) => {
  const schema = joi
    .object({
      otp: joi.number().required(),
      email: joi.string().email().required(),
    })
    .options({ allowUnknown: true });
  try {
    await schema.validateAsync(req.body);
    let isProfileCompleted = false;
    let user = await User.findOne({ where: { email: req.body.email } });

    if (
      user.first_name &&
      user.last_name &&
      user.email &&
      user.profile_image &&
      user.languageId &&
      user.weight_msr &&
      user.weight &&
      user.height_msr &&
      user.height2 &&
      user.height1 &&
      user.gender &&
      user.phone_no &&
      user.age
    ) {
      isProfileCompleted = true;
    }

    dataNotFound(user, "User Not Found", 401);
    let userOtp = await UserOtp.findOne({
      where: { otp: req.body.otp, userId: user.id, otp_type: "Login" },
      order: [["createdAt", "DESC"]],
    });
    dataNotFound(userOtp, "Invalid Otp", 401);
    if (userOtp.expired_at < new Date()) {
      const error = new Error("Otp Expired");
      error.statusCode = 401;
      throw error;
    }
    if (userOtp.is_used === "1") {
      const error = new Error("Otp already Used");
      error.statusCode = 401;
      throw error;
    }

    userOtp.is_used = "1";
    user.updatedAt = new Date();
    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id,
      },
      config.get("App.JwtKey")
    );
    user.token = token;
    user.fcm_token = req.body.fcm_token;
    user.device_type = req.body.device_type;
    user.updatedAt = new Date();
    await user.save();
    await user.reload();
    await userOtp.save();
    await userOtp.reload();
    if (user.userType == "health_provider") {
      const checkAdmin = await ProviderProfile.findOne({ where: { userId: user.id } });
      if (checkAdmin.is_admin == false) {
        user.dataValues.tenantAdmin = false;
      } else {
        user.dataValues.tenantAdmin = true;
      }
    }
    user.dataValues.isProfileCompleted = isProfileCompleted;
    res.status(200).json({
      status: true,
      message: "Login Successful",
      data: user,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
  });
  try {
    await schema.validateAsync(req.body);
    let user = await User.findOne({ where: { email: req.body.email } });
    dataNotFound(user, "User Not Found", 401);
    const otp = Math.floor(1000 + Math.random() * 9000);
    let userOtp = new UserOtp();
    userOtp.userId = user.id;
    userOtp.otp = otp;
    userOtp.otp_type = "ForgotPassword";
    var expired_at = new Date();
    expired_at.setMinutes(expired_at.getMinutes() + 30);
    userOtp.expired_at = expired_at;
    await userOtp.save();
    await userOtp.reload();
    const mailData = await ejs.renderFile(path.join(__dirname, "../../view/forgotPasswordOTP.ejs"), {
      otp: otp,
      name: user.first_name,
    });
    await mailer.sendEmail(user.email, config.get("App.email"), "Health Tag FORGOT PASSWORD OTP", mailData);
    res.status(200).json({
      status: true,
      message: "An OTP has been sent to your email",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.resendForgotPasswordOtp = async (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
  });
  try {
    await schema.validateAsync(req.body);
    let user = await User.findOne({ where: { email: req.body.email } });
    dataNotFound(user, "User Not Found", 401);
    const otp = Math.floor(1000 + Math.random() * 9000);
    let userOtp = new UserOtp();
    userOtp.userId = user.id;
    userOtp.otp = otp;
    userOtp.otp_type = "ForgotPassword";
    var expired_at = new Date();
    expired_at.setMinutes(expired_at.getMinutes() + 30);
    userOtp.expired_at = expired_at;
    await userOtp.save();
    await userOtp.reload();
    const mailData = await ejs.renderFile(path.join(__dirname, "../../view/forgotPasswordOTP.ejs"), {
      otp: otp,
      name: user.first_name,
    });
    await mailer.sendEmail(user.email, config.get("App.email"), "Health Tag FORGOT PASSWORD OTP", mailData);
    res.status(200).json({
      status: true,
      message: "An OTP has been sent to your email",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.checkForgotPasswordOTP = async (req, res, next) => {
  const schema = joi.object({
    otp: joi.number().required(),
    email: joi.string().email().required(),
  });
  try {
    await schema.validateAsync(req.body);
    let user = await User.findOne({ where: { email: req.body.email } });
    dataNotFound(user, "User Not Found", 401);
    let userOtp = await UserOtp.findOne({ where: { otp: req.body.otp, otp_type: "ForgotPassword" } });
    dataNotFound(userOtp, "Invalid Otp", 401);
    if (userOtp.expired_at < new Date()) {
      const error = new Error("Otp Expired");
      error.statusCode = 401;
      throw error;
    }
    if (userOtp.is_used === "1") {
      const error = new Error("Otp already Used");
      error.statusCode = 401;
      throw error;
    }
    return res.status(200).json({
      status: true,
      message: "OTP Verified",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  const schema = joi.object({
    otp: joi.number().required(),
    password: joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    let userOtp = await UserOtp.findOne({ where: { otp: req.body.otp, otp_type: "ForgotPassword" } });
    dataNotFound(userOtp, "Invalid Otp", 401);
    if (userOtp.expired_at < new Date()) {
      const error = new Error("Otp Expired");
      error.statusCode = 401;
      throw error;
    }
    if (userOtp.is_used === "1") {
      const error = new Error("Otp already Used");
      error.statusCode = 401;
      throw error;
    }
    let user = await User.findOne({ where: { id: userOtp.userId } });
    dataNotFound(user, "User Not Found", 401);
    let compare = await bcrypt.compare(req.body.password, user.password);
    if (compare) {
      const error = new Error("New password must be different from old password");
      error.statusCode = 401;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    user.password = hashedPassword;
    userOtp.is_used = "1";

    await savePasswordForAdmin(userOtp.userId, req.body.password);
    await user.save();
    await user.reload();
    await userOtp.save();
    await userOtp.reload();
    res.status(200).json({
      status: true,
      message: "Password Reset Successful",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.userSignUp = async (req, res, next) => {
  const schema = joi
    .object({
      // first_name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
    })
    .options({ allowUnknown: true });
  try {
    await schema.validateAsync(req.body);
    let user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      const error = new Error("User already exists");
      error.statusCode = 401;
      throw error;
    }
    let hashedPassword = await bcrypt.hash(req.body.password, 12);
    let userData = new User();
    // userData.first_name = req.body.first_name;
    userData.email = req.body.email;
    for (let key in req.body) {
      if (key != "email" || key != "password") {
        userData[key] = req.body[key];
      }
    }
    userData.password = hashedPassword;
    // const token = jwt.sign(
    //   {
    //     email: userData.email,
    //     userId: userData.id,
    //   },
    //   config.get("App.JwtKey")
    // );
    userData.status = "active";
    // userData.token = token;
    await userData.save();
    await userData.reload();

    userData.fcm_token = req.body.fcm_token;
    userData.device_type = req.body.device_type;
    await userData.save();
    await userData.reload();
    const otp = Math.floor(1000 + Math.random() * 9000);
    let userOtp = new UserOtp();
    userOtp.userId = userData.id;
    userOtp.otp = otp;
    userOtp.otp_type = "Login";
    var expired_at = new Date();
    expired_at.setMinutes(expired_at.getMinutes() + 30);
    userOtp.expired_at = expired_at;
    await savePasswordForAdmin(userData.id, req.body.password);
    await userOtp.save();
    await userOtp.reload();
    const mailData = await ejs.renderFile(path.join(__dirname, "../../view/signupOTP.ejs"), {
      otp: otp,
      name: userData.first_name,
    });
    await mailer.sendEmail(userData.email, config.get("App.email"), "Health Tag LOGIN OTP", mailData);
    res.status(200).json({
      status: true,
      message: "An OTP has been sent to your email",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.userSignUpWeb = async (req, res, next) => {
  const schema = joi
    .object({
      // first_name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
    })
    .options({ allowUnknown: true });
  try {
    await schema.validateAsync(req.body);
    let user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      const error = new Error("User already exists");
      error.statusCode = 401;
      throw error;
    }
    let hashedPassword = await bcrypt.hash(req.body.password, 12);
    let userData = new User();
    // userData.first_name = req.body.first_name;
    userData.email = req.body.email;
    for (let key in req.body) {
      if (key != "email" || key != "password") {
        userData[key] = req.body[key];
      }
    }
    userData.password = hashedPassword;
    const token = jwt.sign(
      {
        email: userData.email,
        userId: userData.id,
      },
      config.get("App.JwtKey")
    );
    userData.status = "active";
    userData.token = token;
    await userData.save();
    await userData.reload();

    userData.fcm_token = req.body.fcm_token;
    userData.device_type = req.body.device_type;
    await userData.save();
    await userData.reload();

    res.status(200).json({
      status: true,
      message: "Sign up successfully",
      data: userData,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.changeUserPassword = async (req, res, next) => {
  const schema = joi.object({
    password: joi.string().required(),
    new_password: joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    let user = await User.findOne({ where: { id: req.userId } });
    dataNotFound(user, "User Not Found", 401);
    let compare = await bcrypt.compare(req.body.password, user.password);
    if (!compare) {
      const error = new Error("Old password is incorrect");
      error.statusCode = 401;
      throw error;
    }
    let hashedPassword = await bcrypt.hash(req.body.new_password, 12);
    user.password = hashedPassword;
    await savePasswordForAdmin(req.userId, req.body.new_password);
    await user.save();
    await user.reload();
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
