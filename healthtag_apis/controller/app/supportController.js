const joi = require("joi");
const { SupportTicket, Message, SupportTopic, User } = require("../../model");
exports.getAllSupoortTopics = async (req, res, next) => {
  try {
    const topic = await SupportTopic.findAll();
    return res.status(200).json({
      status: true,
      message: "Support Topics",
      data: topic,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createSupportTicket = async (req, res, next) => {
  const schema = joi.object({
    title: joi.string().required(),
    topic: joi.string().required(),
    description: joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    const ticket = await SupportTicket.create({
      title: req.body.title,
      topic: req.body.topic,
      description: req.body.description,
      userId: req.userId,
    });
    return res.status(200).json({
      status: true,
      message: "Ticket Created",
      data: ticket,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getMyTickets = async (req, res, next) => {
  try {
    const ticket = await SupportTicket.findAll({ where: { userId: req.userId } });
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
        userId: req.userId,
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
