const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");
const User = require("./user");

class DeviceConnection extends Model {}

DeviceConnection.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM("device_conneted", "device_disconnected", "test_started", "test_ended"),
    },
  },
  {
    sequelize,
    modelName: "device_connections",
  }
);

module.exports = DeviceConnection;
