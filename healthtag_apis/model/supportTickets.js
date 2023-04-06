const { Sequelize, Model, DataTypes, ENUM } = require("sequelize");
const sequelize = require("../database/util");
const User = require("./user");

class SupportTicket extends Model {}

SupportTicket.init(
  {
    title: {
      type: DataTypes.STRING,
    },
    topic: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: ENUM("open", "solved"),
      defaultValue: "open",
    },
  },
  {
    sequelize,
    modelName: "supprt_tickets",
  }
);

module.exports = SupportTicket;
