const { Sequelize, Model, DataTypes, ENUM } = require("sequelize");
const sequelize = require("../database/util");
const User = require("./user");

class ProductTypes extends Model {}

ProductTypes.init(
  {
    product_type: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "product_types",
  }
);

module.exports = ProductTypes;
