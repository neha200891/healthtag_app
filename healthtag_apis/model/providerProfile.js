const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");
const User = require("./user");

class ProviderProfile extends Model {}

ProviderProfile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    business_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    incorporation_year: {
      type: DataTypes.STRING,
    },
    certification_number: {
      type: DataTypes.STRING,
    },
    contact_person: {
      type: DataTypes.STRING,
    },
    qr_code: {
      type: DataTypes.TEXT,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "providerprofile",
  }
);

module.exports = ProviderProfile;
