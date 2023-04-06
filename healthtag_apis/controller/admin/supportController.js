const model = require("../../model");
const { SupportTopic, Message, User, SupportTicket } = require("../../model");

exports.addSupportTopic = async (req, res, next) => {
  try {
    const topic = await SupportTopic.create({ topic: req.body.topic });
    return res.status(200).json({
      status: true,
      message: "Topic created",
      data: topic,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteTopic = async (req, res, next) => {
  try {
    const topic = await SupportTopic.destroy({ where: { id: req.params.topicId } });
    return res.status(200).json({
      status: true,
      message: "Topic deleted",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllTopic = async (req, res, next) => {
  try {
    const topic = await SupportTopic.findAll();
    return res.status(200).json({
      status: true,
      message: "Topics",
      data: topic,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllTickets = async (req, res, next) => {
  try {
    let ticket;
    if (req.query.status) {
      ticket = await SupportTicket.findAll({
        where: { status: req.query.status },
        include: [{ model: User, attributes: ["id", "first_name", "last_name", "email", "profile_image"] }],
      });
    } else {
      ticket = await SupportTicket.findAll({
        include: [{ model: User, attributes: ["id", "first_name", "last_name", "email", "profile_image"] }],
      });
    }

    return res.status(200).json({
      status: true,
      message: "Support Tickets",
      data: ticket,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.sendMessage = async (req, res, next) => {
  try {
    const { message, ticketId } = req.body;
    const chat = await Message.create({
      message: message,
      ticketId: ticketId,
      userId: req.userId,
    });
    return res.status(200).json({
      status: true,
      message: "message Sent",
      data: chat,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllTicketChats = async (req, res, next) => {
  try {
    const chat = await Message.findAll({
      where: {
        ticketId: req.params.ticketId,
      },
      include: [{ model: User, attributes: ["id", "first_name", "last_name", "email", "profile_image"] }],
    });
    return res.status(200).json({
      status: true,
      message: "message Sent",
      data: chat,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.changeTicketStatus = async (req, res, next) => {
  try {
    const ticket = await SupportTicket.findOne({ where: { id: req.params.ticketId } });
    ticket.status = "solved";
    await ticket.save();
    await ticket.reload();
    return res.status(200).json({
      status: true,
      message: "Ticked closed",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
