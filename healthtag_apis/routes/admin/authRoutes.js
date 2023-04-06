const router = require("express").Router();
const authController = require("../../controller/admin/authController");

const isAuth = require("../../middleware/isAuth");

router.post("/createuser", authController.createUserAccount);
router.post("/adminlogin", authController.adminLogin);

router.post("/create-tenant", authController.createTanentProfile);
router.post("/create-master", authController.createMasters);
router.post("/create-provider", isAuth, authController.createProviderProfile);

router.get("/get-masters", authController.getMasters);

router.get("/updateProviderQRCode/:providerId", authController.updateProviderQRCode);

module.exports = router;
