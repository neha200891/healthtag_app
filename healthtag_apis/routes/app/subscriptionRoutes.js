const router = require("express").Router();
const subscriptionController = require("../../controller/app/SubscriptionController");
const isAuth = require("../../middleware/isAuth");
router.post("/purchasePlan", isAuth, subscriptionController.purchasePlan);
router.get("/getMyPurchasedPlans", isAuth, subscriptionController.getMyPurchasedPlans);
router.get("/getAllPlans", isAuth, subscriptionController.getAllPlans);

module.exports = router;
