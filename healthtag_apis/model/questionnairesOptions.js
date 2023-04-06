const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");

class QuestionnairesOption extends Model {}

QuestionnairesOption.init(
  {
    option: {
      type: DataTypes.STRING,
    },
    score: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  {
    sequelize,
    modelName: "questionnaires_option",
  }
);

module.exports = QuestionnairesOption;
