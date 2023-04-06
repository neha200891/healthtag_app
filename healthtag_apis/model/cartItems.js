const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");

class CartItem extends Model {}

CartItem.init(
  {
    quantity: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize,
    tableName: "cart_item",
  }
);

module.exports = CartItem;
