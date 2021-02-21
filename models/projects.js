"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Projects.hasOne(models.Album, { foreignKey: "project_id", as: "album" });
      Projects.belongsToMany(models.Tag, {
        through: "ProjectTags",
        foreignKey: "project_id",
        as: "tags",
      });
    }
  }
  Projects.init(
    {
      title: DataTypes.STRING,
      type: DataTypes.STRING,
      language: DataTypes.STRING,
      type: DataTypes.STRING,
      author: DataTypes.STRING,
      album_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Projects",
    }
  );
  return Projects;
};
