const router = require("express").Router();
const contentController = require("../../controller/admin/contentController");

router.post("/add-blog", contentController.addEditContent);
router.get("/get-blogs", contentController.getAllBlogs);
router.get("/change-blog-status/:blogId", contentController.changeBlogStatus);
router.get("/delete-blog/:blogId", contentController.deleteBlog);
router.post("/uploadBlogImage", contentController.uploadBlogImage);

module.exports = router;
