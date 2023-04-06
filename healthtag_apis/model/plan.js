const { Model, Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/util");

class Plan extends Model {}

Plan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    planName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    device_limit: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    image: {
      type: DataTypes.TEXT,
    },
    days: {
      type: DataTypes.INTEGER,
    },
    trend_analytics: {
      type: DataTypes.BOOLEAN,
    },
    provider_access: {
      type: DataTypes.BOOLEAN,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    sequelize,
    modelName: "plan",
  }
);

module.exports = Plan;
