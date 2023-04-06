const router = require("express").Router();
const userController = require("../../controller/admin/userController");

const isAuth = require("../../middleware/isAuth");

router.get("/getAllUsers", userController.getAllUsers);
router.post("/changeUserStatus/", userController.changeUserStatus);
router.get("/getUserProfile/:id", userController.getUserProfile);
router.post("/editUserProfileAdmin/:id", userController.editUserProfileAdmin);
router.get("/letestCreatedUser", userController.latestCreatedUser);
router.get("/lastLoggedInUsers", userController.lastLoggedInUsersList);
router.get("/deleteUser/:id", userController.deleteUser);
router.get("/alltenents", userController.getAllTenants);
router.get("/tenantProviders/:tenantId", userController.getAllTenantProviders);
router.get("/allproviders", isAuth, userController.getAllHealthProviders);
router.get("/allTenentCustomers", isAuth, userController.getAllTenantCustomers);
router.get("/allProviderCustomers", isAuth, userController.getAllProviderCustomers);
router.post("/editCustomerDetails", userController.editCustomerDetails);
router.post("/editHealthProviderProfile", userController.editHealthProviderProfile);
router.post("/changeCustomerTanency", userController.changeCustomerTanency);

router.get("/getAllOrders", userController.getAllOrders);
router.get("/getOrderDetails/:orderId", userController.getProductDetails);
router.post("/changeOrderStatus", userController.changeOrderStatus);
router.post("/addSerialNumbers", userController.addSerialNumbers);

router.post("/makeProviderAdmin", isAuth, userController.makeProviderAdmin);

router.get("/getUserOrders/:userId", isAuth, userController.getUserOrders);
router.get("/getUserSubscription/:userId", isAuth, userController.getUserSubscriptions);
router.get("/getUserDevices/:userId", isAuth, userController.getUserConnectedDevices);

router.get("/admin-dashboard", isAuth, userController.adminDashboard);
router.get("/user-reports", isAuth, userController.getUserReportData);

module.exports = router;
