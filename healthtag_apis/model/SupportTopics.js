const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");

class SupportTopic extends Model {}

SupportTopic.init(
  {
    topic: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "support_topic",
  }
);

module.exports = SupportTopic;
