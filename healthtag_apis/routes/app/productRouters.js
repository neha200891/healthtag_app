const router = require("express").Router();
const productController = require("../../controller/app/productController");
const isAuth = require("../../middleware/isAuth");
router.get("/getCategories", productController.getAllCategories);
router.get("/getCategoriesDetails/:categoryId", productController.getCategoryDetails);
router.get("/getProducts", productController.getAllProducts);
router.get("/productDetail/:productId", productController.getProductDetails);
router.get("/categoryQuestion/:categoryId", productController.getCategoryQuestion);

router.post("/addToCart", isAuth, productController.addToCart);
router.post("/changeProductQuantity", isAuth, productController.changeProductQuantity);
router.post("/removeItemFromCart", isAuth, productController.deleteItemFromCart);
router.get("/getMyCart", isAuth, productController.getMyCart);
router.get("/clearMyCart", isAuth, productController.clearMyCart);

router.post("/checkoutCartItems", isAuth, productController.checkoutCartItem);
router.post("/checkoutCartItems_mobile", isAuth, productController.checkoutCartItemMobile);

router.get("/getMyOrders", isAuth, productController.getAllMyOrders);

router.post("/buyNowProduct", isAuth, productController.buyNowProduct);
router.post("/buyNowProduct_mobile", isAuth, productController.buyNowProductFromMobile);
router.post("/changeOrderStatus", isAuth, productController.changeUserOrderStatus);

router.get("/getRecommendedProducts", isAuth, productController.getRecomendedProducts);
router.get("/dashboard", productController.dashboardData);

router.post("/postUserReview", isAuth, productController.AddUserReview);
router.get("/getServiceTax", productController.getServiceTax);

module.exports = router;
