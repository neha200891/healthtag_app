const { Blog } = require("../../model");

exports.getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({ where: { status: "active" } });
    return res.status(200).json({
      status: true,
      message: "Blog List",
      data: blogs,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.blogDetails = async (req, res, next) => {
  try {
    const blogs = await Blog.findOne({ where: { status: "active", id: req.params.blogId } });
    return res.status(200).json({
      status: true,
      message: "Blog List",
      data: blogs,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
