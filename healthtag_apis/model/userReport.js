const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");
const User = require("./user");

class UserReport extends Model {}

UserReport.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    chart_type: {
      type: DataTypes.STRING,
    },
    report_data: {
      type: DataTypes.JSON,

      // get() {
      //   return JSON.parse(this.getDataValue("report_data"));
      // },
    },
    graph_data: {
      type: DataTypes.JSON,
      // get() {
      //   return JSON.parse(this.getDataValue("graph_data"));
      // },
    },
  },
  {
    sequelize,
    modelName: "user_reports",
  }
);

module.exports = UserReport;
