const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../database/util");
const User = require("./user");

class MyCustomers extends Model {}

MyCustomers.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "mycustomers",
  }
);

module.exports = MyCustomers;
