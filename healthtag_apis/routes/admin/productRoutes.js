const router = require("express").Router();
const productController = require("../../controller/admin/productController");

router.post("/add-category", productController.addCategory);
router.get("/get-categories", productController.getAllCategories);
router.get("/change-category-status/:categoryId", productController.changeCategoryStatus);
router.get("/delete-category/:categoryId", productController.deleteCategory);

router.post("/add-product", productController.addProduct);
router.get("/get-products", productController.getAllProducts);
router.get("/get-products-details/:productId", productController.getProductDetails);
router.get("/change-product-status/:productId", productController.changeProductStatus);
router.get("/delete-product/:productId", productController.deleteProduct);
router.get("/delete-product-image/:imageId", productController.deleteProductImage);

router.post("/addCategoryQuestion", productController.addCategoryQuestion);
router.get("/getCategoryQuestion", productController.getAllCategoryQuestion);
router.post("/changeQuestionStatus", productController.changeCategoryQuestionStatus);
router.post("/changeOptionStatus", productController.changeQuestionOptionStatus);
router.get("/questionDetails/:questionId", productController.getCategoryQuestionDetails);

router.post("/editCategoryQuestion", productController.editQuestions);
router.post("/addEditQuestionOption", productController.addEditQuestionOption);

router.post("/addProductType", productController.addProductType);
router.get("/getProductTypes", productController.getProductTypes);
router.get("/deleteProductType/:productTypeId", productController.deleteProductType);
router.post("/addServiceTax", productController.addServiceTax);
router.get("/getServiceTax", productController.getServiceTax);

module.exports = router;
