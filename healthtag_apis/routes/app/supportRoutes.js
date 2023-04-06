const router = require("express").Router();
const supportController = require("../../controller/app/supportController");
const isAuth = require("../../middleware/isAuth");

router.get("/getAllTopics", supportController.getAllSupoortTopics);
router.post("/createTicket", isAuth, supportController.createSupportTicket);
router.get("/getMyTickets", isAuth, supportController.getMyTickets);
router.post("/sentMessage", isAuth, supportController.sendMessage);
router.get("/getTicketChat/:ticketId", isAuth, supportController.getAllTicketChats);

module.exports = router;
