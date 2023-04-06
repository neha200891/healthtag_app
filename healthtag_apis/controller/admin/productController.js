const joi = require("joi");
const { uploadFile, removeFile } = require("../../helper/File");
const {
  Category,
  Product,
  ProductImages,
  CategoryQuestion,
  QuestionnairesOption,
  ProductTypes,
  ServiceTax,
} = require("../../model");

exports.addCategory = async (req, res, next) => {
  const schema = joi
    .object({
      category: joi.string().required(),
      short_desc: joi.string().optional(),
      long_desc: joi.string().optional(),
      image: joi.string().optional(),
      status: joi.string().allow("active", "inactive").optional(),
    })
    .options({ allowUnknown: true });
  let uploadedFile;
  try {
    const { body, file } = await uploadFile(req, "images/products");
    uploadedFile = file;
    await schema.validateAsync(req.body);
    const create = new Object();
    for (let key in body) {
      create[key] = body[key];
    }
    if (file.path) {
      create.image = file.path;
    }
    if (body.categoryId) {
      await Category.update(create, { where: { id: body.categoryId } });
      return res.status(200).json({ status: true, message: "Category updated successfully" });
    } else {
      await Category.create(create);
      return res.status(200).json({ status: true, message: "Category created successfully" });
    }
  } catch (err) {
    if (uploadedFile && uploadedFile.path) {
      removeFile(uploadedFile.path);
    }
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({ where: { id: req.params.categoryId } });
    removeFile(category.image);
    await category.destroy();
    return res.status(200).json({
      status: true,
      data: "Category Deleted Successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
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

exports.changeCategoryStatus = async (req, res, next) => {
  try {
    const categories = await Category.findOne({ where: { id: req.params.categoryId } });
    if (categories.status === "active") {
      categories.status = "inactive";
    } else {
      categories.status = "active";
    }
    await categories.save();
    await categories.reload();
    return res.status(200).json({
      status: true,
      message: "Category Status Changed",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addProduct = async (req, res, next) => {
  const schema = joi
    .object({
      name: joi.string().required(),
      short_desc: joi.string().optional(),
      long_desc: joi.string().optional(),
      how_to_use: joi.string().optional(),
      status: joi.string().allow("active", "inactive").optional(),
      price: joi.string().optional(),
      categoryId: joi.number().required(),
      productTypeId: joi.number().required(),
    })
    .options({ allowUnknown: true });
  let uploadedFile;
  try {
    const { body, file } = await uploadFile(req, "images/products");
    uploadedFile = file;

    await schema.validateAsync(req.body);
    const create = new Object();
    for (let key in body) {
      create[key] = body[key];
    }
    if (file.path) {
      create.image = file.path;
    }
    let images = [];
    let productId = null;
    if (body.productId) {
      productId = body.productId;
      await Product.update(create, { where: { id: body.productId } });
      res.status(200).json({ status: true, message: "Product updated successfully" });
    } else {
      let product = await Product.create(create);
      productId = product.id;
      res.status(200).json({ status: true, message: "Product created successfully" });
    }
    if (file.length > 1) {
      file.forEach((ele) => {
        images.push({ image: ele.path, productId: productId });
      });
    } else if (file.length == 1) {
      images.push({ image: file.path, productId: productId });
    }
    if (images.length > 0) {
      await ProductImages.bulkCreate(images);
    }
  } catch (err) {
    if (uploadedFile && uploadedFile.path && uploadedFile.length > 1) {
      uploadedFile.forEach((ele) => {
        removeFile(ele.path);
      });
    } else {
      removeFile(uploadedFile.path);
    }
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    let products;
    if (req.query.categoryId) {
      products = await Product.findAll({
        where: { categoryId: req.query.categoryId },
        include: [
          { model: ProductImages, attributes: ["id", "image", "productId"] },
          { model: Category, attributes: ["id", "category"] },
        ],
      });
    } else {
      products = await Product.findAll({
        include: [
          { model: ProductImages, attributes: ["id", "image", "productId"] },
          { model: Category, attributes: ["id", "category"] },
        ],
      });
    }

    return res.status(200).json({
      status: true,
      message: "All products",
      data: products,
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
    let products;

    products = await Product.findOne({
      where: {
        id: req.params.productId,
      },
      include: [
        { model: ProductImages, attributes: ["id", "image", "productId"] },
        { model: Category, attributes: ["id", "category"] },
      ],
    });

    return res.status(200).json({
      status: true,
      message: "All products",
      data: products,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.changeProductStatus = async (req, res, next) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.productId } });
    if (product.status === "active") {
      product.status = "inactive";
    } else {
      product.status = "active";
    }
    await product.save();
    await product.reload();
    return res.status(200).json({
      status: true,
      message: "Product Status Changed",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.productId } });
    const productImages = await ProductImages.findAll({ where: { productId: req.params.productId } });
    let i = 0;
    while (i < productImages.length) {
      removeFile(productImages[i].image);
      i++;
    }

    await product.destroy();
    return res.status(200).json({
      status: true,
      data: "Product Deleted Successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteProductImage = async (req, res, next) => {
  try {
    let productImage = await ProductImages.findOne({ where: { id: req.params.imageId } });
    removeFile(productImage.image);
    await productImage.destroy();
    return res.status(200).json({
      status: true,
      data: "Image Deleted Successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addCategoryQuestion = async (req, res, next) => {
  const schema = joi.object({
    question: joi.string().required(),
    categoryId: joi.number().required(),
    questionId: joi.string().optional(),
    ques_type: joi.string().optional(),
    options: joi.array().allow(),
  });
  try {
    await schema.validateAsync(req.body);
    if (req.body.questionId) {
      let categoryQuestion = await CategoryQuestion.findOne({ where: { id: req.body.questionId } });
      for (let key in categoryQuestion) {
        categoryQuestion[key] = req.body[key];
      }
      await categoryQuestion.save();
      await categoryQuestion.reload();
      return res.status(200).json({
        status: true,
        message: "Question Edited",
      });
    } else {
      const create = new Object();

      const question = await CategoryQuestion.create({
        question: req.body.question,
        categoryId: req.body.categoryId,
        ques_type: req.body.ques_type,
      });
      let options = req.body.options;
      let i = 0;
      while (i < options.length) {
        await QuestionnairesOption.create({
          option: options[i].option,
          score: options[i].score,
          questionId: question.id,
        });
        i++;
      }

      return res.status(200).json({
        status: true,
        message: "Question Added",
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllCategoryQuestion = async (req, res, next) => {
  try {
    let question;
    if (req.query.categoryId) {
      question = await CategoryQuestion.findAll({
        include: [{ model: Category }],
        where: { categoryId: req.query.categoryId },
      });
    } else {
      question = await CategoryQuestion.findAll({
        include: [{ model: Category }],
      });
    }
    return res.status(200).json({
      status: true,
      message: "All Question ",
      data: question,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.changeCategoryQuestionStatus = async (req, res, next) => {
  try {
    const catQuestion = await CategoryQuestion.findOne({ where: { id: req.body.questionId } });
    catQuestion.status = req.body.status;
    await catQuestion.save();
    await catQuestion.reload();
    return res.status(200).json({
      status: true,
      message: "Question Status Changed",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.changeQuestionOptionStatus = async (req, res, next) => {
  try {
    const catQuestion = await QuestionnairesOption.findOne({
      where: { id: req.body.optionId, questionId: req.body.questionId },
    });

    catQuestion.status = req.body.status;
    await catQuestion.save();
    await catQuestion.reload();
    return res.status(200).json({
      status: true,
      message: "Option Status Changed",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.getCategoryQuestionDetails = async (req, res, next) => {
  try {
    const question = await CategoryQuestion.findOne({
      where: { id: req.params.questionId },
      include: [{ model: QuestionnairesOption }],
    });
    return res.status(200).json({
      status: true,
      message: "Question details ",
      data: question,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editQuestions = async (req, res, next) => {
  try {
    const question = await CategoryQuestion.findOne({ where: { id: req.body.questionId } });
    question.question = req.body.question;
    await question.save();
    await question.reload();
    return res.status(200).json({
      status: true,
      message: "Question edited ",
      data: question,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addEditQuestionOption = async (req, res, next) => {
  try {
    const { questionId, option, score, optionId } = req.body;
    if (optionId) {
      const optionDetail = await QuestionnairesOption.findOne({ where: { questionId: questionId, id: optionId } });
      optionDetail.option = option;
      optionDetail.score = score;
      await optionDetail.save();
      await optionDetail.reload();
      return res.status(200).json({
        status: true,
        message: "Option edited ",
        data: optionDetail,
      });
    } else {
      const optionDetail = await QuestionnairesOption.create({
        questionId: questionId,
        option: option,
        score: score,
      });
      return res.status(200).json({
        status: true,
        message: "Option added ",
        data: optionDetail,
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addProductType = async (req, res, next) => {
  try {
    const ProductType = await ProductTypes.create({ product_type: req.body.product_type });
    return res.status(200).json({
      status: true,
      message: "Product Type added",
      data: ProductType,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getProductTypes = async (req, res, next) => {
  try {
    const ProductType = await ProductTypes.findAll();
    return res.status(200).json({
      status: true,
      message: "Product Type added",
      data: ProductType,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteProductType = async (req, res, next) => {
  try {
    const ProductType = await ProductTypes.destroy({ where: { id: req.params.productTypeId } });
    return res.status(200).json({
      status: true,
      message: "Product Type added",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addServiceTax = async (req, res, next) => {
  try {
    const { tax } = req.body;
    const serviceTax = await ServiceTax.findOne();
    if (serviceTax) {
      serviceTax.tax = tax;
      await serviceTax.save();
      await serviceTax.reload();
    } else {
      await ServiceTax.create({ tax: tax });
    }
    return res.status(200).json({
      status: true,
      message: "Tax Added",
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
