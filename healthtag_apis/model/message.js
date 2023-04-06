const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");

class Message extends Model {}

Message.init(
  {
    message: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "message",
  }
);

module.exports = Message;
