const joi = require("joi");
const { uploadFile } = require("../../helper/File");
const { dataNotFound } = require("../../helper/helperFunction");
const { Plan, UserSubscription } = require("../../model");

exports.createPlan = async (req, res, next) => {
  const schema = joi.object({
    planName: joi.string().required(),
    description: joi.string().required(),
    days: joi.number().required(),
    price: joi.number().required(),
    status: joi.string().required(),
    planId: joi.number().allow(),
    device_limit: joi.number().allow(),
    trend_analytics: joi.boolean().allow(),
    provider_access: joi.boolean().allow(),
    image: joi.boolean().allow(),
  });
  let uploadedFile;
  try {
    const { body, file } = await uploadFile(req, "images/products");
    uploadedFile = file;
    await schema.validateAsync(req.body);
    let plan = await Plan.findOne({ where: { days: req.body.days } });
    // if (plan && !req.body.planId) {
    //     const error = new Error("Plan Already Exist");
    //     error.statuscode = 401;
    //     throw error;
    // }
    const create = new Object();
    for (let key in req.body) {
      create[key] = req.body[key];
    }
    if (file.path) {
      create.image = file.path;
    }
    if (req.body.planId) {
      plan = await Plan.update(create, { where: { id: req.body.planId } });
    } else {
      plan = await Plan.create(create);
    }
    return res.status(201).json({
      status: true,
      message: req.body.planId ? "Plan Updated Successfully" : "Plan Added Successfully",
      data: plan,
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
    let plans = await Plan.findAll();
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

exports.deletePlan = async (req, res, next) => {
  try {
    let plan = await Plan.findOne({ where: { id: req.params.id } });
    dataNotFound(plan, "Plan Not Found", 401);
    let planUser = await UserSubscription.findOne({ where: { planId: req.params.id, status: "active" } });
    if (planUser) {
      const error = new Error("Plan Already Assigned To User, You Can't Delete");
      error.statuscode = 401;
      throw error;
    }
    plan = await Plan.destroy({ where: { id: req.params.id } });
    return res.status(201).json({
      status: true,
      message: "Plan Deleted Successfully",
      data: plan,
    });
  } catch (err) {
    if (!err.statuscode) {
      err.statuscode = 500;
    }
    next(err);
  }
};

exports.getAllUserPlans = async (req, res, next) => {
  try {
    let plans = await UserSubscription.findAll({ include: [{ model: UserSubscription }] });
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
