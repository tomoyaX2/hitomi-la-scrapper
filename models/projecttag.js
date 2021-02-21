"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProjectTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProjectTag.init(
    { project_id: DataTypes.UUID, tag_id: DataTypes.UUID },
    {
      sequelize,
      modelName: "ProjectTag",
    }
  );
  return ProjectTag;
};
