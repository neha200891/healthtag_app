const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");
const User = require("./user");

class UserAddress extends Model {}

UserAddress.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    zipcode: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.STRING,
    },
    default_address: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    address_type: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "useraddress",
  }
);

module.exports = UserAddress;
