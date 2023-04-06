const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../database/util");

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    age: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: true,
    },
    userType: {
      type: DataTypes.ENUM("admin", "user", "tenant", "health_provider"),
      allowNull: false,
      defaultValue: "user",
    },
    status: {
      type: DataTypes.ENUM("pending", "active", "blocked"),
      defaultValue: "pending",
    },
    profile_image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fcm_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    device_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    device_model: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "web",
    },
    timezone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkedin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pinterest: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notification: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    height1: {
      type: DataTypes.STRING,
    },
    height2: {
      type: DataTypes.STRING,
    },
    height_msr: {
      type: DataTypes.STRING,
    },
    weight: {
      type: DataTypes.STRING,
    },
    weight_msr: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "users",
  }
);

module.exports = User;
