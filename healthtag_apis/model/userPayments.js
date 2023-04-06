const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");
const User = require("./user");

class UserPayment extends Model {}

UserPayment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name_on_card: {
      type: DataTypes.STRING,
    },
    card_no: {
      type: DataTypes.STRING,
    },
    month: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.STRING,
    },
    cvv: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "user_payment",
  }
);

module.exports = UserPayment;
