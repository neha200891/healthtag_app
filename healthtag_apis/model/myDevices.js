const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");

class MyDevices extends Model {}

MyDevices.init(
  {
    nick_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_sno: {
      type: DataTypes.STRING,
    },
    bootId: {
      type: DataTypes.STRING,
    },
    deviceId: {
      type: DataTypes.STRING,
    },
    protocol_Name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "my_devices",
  }
);

module.exports = MyDevices;
