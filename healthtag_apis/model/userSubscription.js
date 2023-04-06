const { Model, Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/util");
class UserSubscription extends Model {}

UserSubscription.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    transection_id: {
      type: DataTypes.STRING,
    },
    total: {
      type: DataTypes.FLOAT,
    },
    status: {
      type: DataTypes.ENUM("pending", "active", "inactive"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    modelName: "user_subscriptions",
  }
);

module.exports = UserSubscription;
