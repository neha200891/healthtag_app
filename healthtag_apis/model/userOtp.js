const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");
const User = require("./user");

class UserOtp extends Model {}

UserOtp.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    otp_type: {
      type: DataTypes.ENUM("ForgotPassword", "Login"),
      allowNull: false,
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    is_used: {
      type: DataTypes.ENUM("0", "1"),
      defaultValue: "0",
      allowNull: false,
    },
    expired_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "userotp",
  }
);

module.exports = UserOtp;
