const { Sequelize, Model, DataTypes } = require("sequelize");
const { Category } = require(".");
const sequelize = require("../database/util");

class Product extends Model {}

Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    short_desc: {
      type: DataTypes.STRING,
    },
    long_desc: {
      type: DataTypes.TEXT,
    },
    how_to_use: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    delivery_rate: {
      type: DataTypes.FLOAT,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  {
    sequelize,
    modelName: "products",
  }
);

module.exports = Product;
