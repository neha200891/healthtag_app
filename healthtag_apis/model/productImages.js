const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");
const Product = require("./product");

class ProductImages extends Model {}

ProductImages.init(
  {
    image: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "productimages",
  }
);

module.exports = ProductImages;
