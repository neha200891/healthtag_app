const router = require("express").Router();
const authController = require("../../controller/app/authController");
const isAuth = require("../../middleware/isAuth");

router.post("/webLogin", authController.webLogin);
router.post("/login", authController.userLogin);
router.post("/checkOtpLogin", authController.checkOtpLogin);
router.post("/resendLoginOtp", authController.resendLoginOTP);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/checkforgotOtp", authController.checkForgotPasswordOTP);
router.post("/resendForgotOtp", authController.resendForgotPasswordOtp);
router.post("/resetPassword", authController.resetPassword);
router.post("/signup", authController.userSignUp);
router.post("/signup-web", authController.userSignUpWeb);
router.post("/changePassword", isAuth, authController.changeUserPassword);

module.exports = router;
