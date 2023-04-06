const router = require("express").Router();
const usersController = require("../../controller/app/usersController");
const isAuth = require("../../middleware/isAuth");
router.post("/editProfile", isAuth, usersController.editUserProfile);
router.post("/editUserInfo/:userId", usersController.editUserProfileById);

router.post("/changeUserPassword", isAuth, usersController.changeUserPassword);
router.get("/userProfile", isAuth, usersController.getUserProfile);

router.post("/addUserAddress", isAuth, usersController.addUserAddress);
router.get("/getMyAddresses", isAuth, usersController.getMyAddresses);
router.post("/editUserAddress", isAuth, usersController.editUserAddress);
router.get("/deleteMyAddress/:addressId", isAuth, usersController.deleteMyAddress);
router.post("/submitAnswer", isAuth, usersController.submitCategoryQuestions);
router.get("/getQuestionariesResult/:categoryId", isAuth, usersController.getQuestionariesResult);

router.get("/getProvidersList", isAuth, usersController.getAllProviders);
router.post("/connectToProvider", isAuth, usersController.connectToProviders);
router.post("/removeHealthProvider", isAuth, usersController.removeMyProvider);
router.get("/getMyProvider", isAuth, usersController.getMyProvider);

router.post("/getProviderProfileEnc", isAuth, usersController.getProviderProfileENC);

router.post("/addPaymentMethod", isAuth, usersController.addUserPaymentMethod);
router.get("/removePaymentMethod/:paymentId", isAuth, usersController.removePaymentMethod);
router.get("/getMyPaymentMethods/", isAuth, usersController.getMyPayments);

router.get("/getAllLanguages", usersController.getAllLanguages);

router.post("/getProductBySerialNo", usersController.searchProductBySerialNumber);

router.post("/addMyDevices", isAuth, usersController.addMyDevices);
router.get("/getMyDevices", isAuth, usersController.getMyDevices);
router.get("/deleteMyDevice/:deviceId", isAuth, usersController.deleteMyDevice);

router.post("/addDeviceConnectionTime", isAuth, usersController.addDeviceConnectionTime);
router.get("/getDeviceConnections", isAuth, usersController.getDeviceConnectionList);

router.post("/saveMyReport", isAuth, usersController.saveMyReportData);
router.get("/getMyReports/:myDeviceId", isAuth, usersController.getMyReportData);

module.exports = router;
