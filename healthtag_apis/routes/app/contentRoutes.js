const router = require("express").Router();
const contentController = require("../../controller/app/contentController");

router.get("/getAllBlogs", contentController.getAllBlogs);
router.get("/getBlogDetails/:blogId", contentController.blogDetails);

module.exports = router;
