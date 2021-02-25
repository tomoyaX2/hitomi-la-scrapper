"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Credentials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Credentials.belongsTo(models.User, { foreignKey: "userId" });
      // define association here
    }
  }
  Credentials.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      login: DataTypes.STRING,
      password: DataTypes.STRING,
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Credentials",
    }
  );
  return Credentials;
};
