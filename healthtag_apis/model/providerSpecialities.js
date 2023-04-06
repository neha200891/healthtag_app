const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");
const Product = require("./product");

class ProviderSpecialities extends Model {}

ProviderSpecialities.init(
  {},
  {
    sequelize,
    modelName: "providerspecialities",
  }
);

module.exports = ProviderSpecialities;
