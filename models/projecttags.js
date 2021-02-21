"use strict";
const { Model } = require("sequelize");
const uuid = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class ProjectTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProjectTags.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      ProjectId: DataTypes.UUID,
      TagId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "ProjectTags",
    }
  );

  return ProjectTags;
};
