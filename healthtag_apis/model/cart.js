const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");

class Cart extends Model {}

Cart.init(
  {
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    delivery_charges: {
      type: DataTypes.FLOAT,
    },
    tax_amount: {
      type: DataTypes.FLOAT,
    },
  },

  {
    sequelize,
    tableName: "cart",
  }
);

module.exports = Cart;
