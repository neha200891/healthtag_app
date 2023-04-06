const router = require("express").Router();
const subscriptionController = require("../../controller/admin/subscriptionController");

router.post("/addPlan", subscriptionController.createPlan);
router.get("/getAllPlans", subscriptionController.getAllPlans);
router.get("/deletePlan/:id", subscriptionController.deletePlan);
router.get("/getAllUserPlans", subscriptionController.getAllUserPlans);

module.exports = router;
