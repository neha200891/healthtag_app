const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../database/util");
const User = require("./user");

class AdminPassword extends Model {}

AdminPassword.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "adminpassword",
  }
);

User.hasOne(AdminPassword, { foreignKey: "userId" });
AdminPassword.belongsTo(User, { foreignKey: "userId" });

module.exports = AdminPassword;
