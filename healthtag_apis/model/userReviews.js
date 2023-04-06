const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");
const User = require("./user");

class UserReview extends Model {}

UserReview.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    rating: {
      type: DataTypes.STRING,
    },
    review: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "user_reviews",
  }
);

module.exports = UserReview;
