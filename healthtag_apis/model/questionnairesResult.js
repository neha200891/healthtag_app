const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");

class QuestionnairesResult extends Model {}

QuestionnairesResult.init(
  {
    attemptNo: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "questionnaires_result",
  }
);

module.exports = QuestionnairesResult;
