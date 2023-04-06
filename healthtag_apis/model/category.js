const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");

class Category extends Model {}

Category.init(
  {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    short_desc: {
      type: DataTypes.STRING,
    },
    long_desc: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.TEXT,
    },

    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
    red_zone: {
      type: DataTypes.INTEGER,
    },
    yellow_zone: {
      type: DataTypes.INTEGER,
    },
    green_zone: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "categories",
  }
);

module.exports = Category;
