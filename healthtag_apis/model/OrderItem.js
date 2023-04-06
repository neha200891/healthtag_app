const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");

class OrderItem extends Model {}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    quantity: {
      type: DataTypes.FLOAT,
    },
    item_price: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize,
    tableName: "order_item",
  }
);

module.exports = OrderItem;
