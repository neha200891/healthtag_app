const joi = require("joi");
const { uploadFile, removeFile } = require("../../helper/File");
const { Blog, Category } = require("../../model");

exports.addEditContent = async (req, res, next) => {
  const schema = joi
    .object({
      heading: joi.string().required(),
      content: joi.string().required(),
      image: joi.string().optional(),
      categoryId: joi.number().optional(),
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
    if (body.blogId) {
      await Blog.update(create, { where: { id: body.blogId } });
      return res.status(200).json({ status: true, message: "Blog updated successfully" });
    } else {
      await Blog.create(create);
      return res.status(200).json({ status: true, message: "Blog created successfully" });
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

exports.uploadBlogImage = async (req, res, next) => {
  let uploadedFile;
  try {
    const { body, file } = await uploadFile(req, "images/products");
    uploadedFile = file;
    return res.status(200).json({
      url: file.path,
      uploaded: true,
    });
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

exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ where: { id: req.params.blogId } });
    removeFile(blog.image);
    await blog.destroy();
    return res.status(200).json({
      status: true,
      data: "Blog Deleted Successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({ include: [{ model: Category, attributes: ["id", "category"] }] });
    return res.status(200).json({
      status: true,
      message: "All Blogs",
      data: blogs,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.changeBlogStatus = async (req, res, next) => {
  try {
    const blogs = await Blog.findOne({ where: { id: req.params.blogId } });
    if (blogs.status === "active") {
      blogs.status = "inactive";
    } else {
      blogs.status = "active";
    }
    await blogs.save();
    await blogs.reload();
    return res.status(200).json({
      status: true,
      message: "Blog Status Changed",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
