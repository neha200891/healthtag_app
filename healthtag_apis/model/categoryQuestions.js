const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");

class CategoryQuestion extends Model {}

CategoryQuestion.init(
  {
    question: {
      type: DataTypes.STRING,
    },
    ques_type: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  {
    sequelize,
    modelName: "categoryquestion",
  }
);

module.exports = CategoryQuestion;
