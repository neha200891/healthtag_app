const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "amount_paid", "dispatched", "completed", "cancelled", "failed"),
    },
    delivery_charges: {
      type: DataTypes.FLOAT,
    },
    tax_amount: {
      type: DataTypes.FLOAT,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    payment_id: {
      type: DataTypes.STRING,
    },
    mode: {
      type: DataTypes.ENUM("cash", "online", "card"),
    },
    expected_delivery_date: {
      type: DataTypes.STRING,
    },

    tracking_id: {
      type: DataTypes.STRING,
    },
    delivery_partner: {
      type: DataTypes.STRING,
    },
    tracking_url: {
      type: DataTypes.STRING,
    },
    intantId: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    tableName: "orders",
  }
);

module.exports = Order;
