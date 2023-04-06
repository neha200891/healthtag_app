const { Sequelize, Model, DataTypes, ENUM } = require("sequelize");
const sequelize = require("../database/util");
const User = require("./user");

class ProductSerial extends Model {}

ProductSerial.init(
  {
    product_sno: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "product_serials",
  }
);

module.exports = ProductSerial;
