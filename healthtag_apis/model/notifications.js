const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");
const User = require("../model/user");
class Notification extends Model {}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    notification: {
      get() {
        const dataValue = this.getDataValue("notification");
        return dataValue ? JSON.parse(dataValue) : null;
      },
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("unread", "read"),
      defaultValue: "unread",
    },
  },
  {
    sequelize,
    modelName: "notifications",
  }
);

module.exports = Notification;
