const router = require("express").Router();
const supportController = require("../../controller/admin/supportController");
const isAuth = require("../../middleware/isAuth");

router.post("/addTopic", supportController.addSupportTopic);
router.get("/deleteTopic/:topicId", supportController.deleteTopic);
router.get("/getTopics", supportController.getAllTopic);
router.get("/getAllTickets", supportController.getAllTickets);
router.post("/sendMessage", isAuth, supportController.sendMessage);
router.get("/getAllTicketChats/:ticketId", isAuth, supportController.getAllTicketChats);
router.get("/changeTicketStatus/:ticketId", isAuth, supportController.changeTicketStatus);

module.exports = router;
