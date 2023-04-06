const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");
const User = require("./user");

class Master extends Model {}

Master.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    health_providers: {
      type: DataTypes.INTEGER,
    },
    users: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "master",
  }
);

module.exports = Master;
