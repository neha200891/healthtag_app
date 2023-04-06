const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");

class Blog extends Model {}

Blog.init(
  {
    heading: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
    },
    content: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
    tags: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    tableName: "blog",
  }
);

module.exports = Blog;
