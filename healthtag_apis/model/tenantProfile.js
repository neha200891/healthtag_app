const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../database/util");
const User = require("./user");

class TenantProfile extends Model {}

TenantProfile.init(
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
    health_providers: {
      type: DataTypes.INTEGER,
    },
    users: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "tenantprofile",
  }
);

module.exports = TenantProfile;
