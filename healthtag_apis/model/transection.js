const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");

class Transection extends Model {}

Transection.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    transection_id: {
      type: DataTypes.STRING,
    },
    mode: {
      type: DataTypes.ENUM("cash", "online", "card"),
    },
    status: {
      type: DataTypes.ENUM("failed", "success"),
    },
  },
  {
    sequelize,
    tableName: "transection",
  }
);

module.exports = Transection;
