const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");
const User = require("./user");

class ServiceTax extends Model {}

ServiceTax.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    tax: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize,
    modelName: "service_tax",
  }
);

module.exports = ServiceTax;
