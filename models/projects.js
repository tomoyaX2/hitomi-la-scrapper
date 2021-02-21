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
      Projects.belongsToMany(models.Tag, {
        through: "ProjectTags",
        foreignKey: "project_id",
        as: "tags",
      });
      Projects.belongsTo(models.Author, {
        foreignKey: "author_id",
        as: "author",
      });
      Projects.belongsTo(models.Album, {
        foreignKey: "album_id",
        as: "album",
      });
      Projects.belongsTo(models.Series, {
        foreignKey: "series_id",
        as: "series",
      });
      Projects.belongsTo(models.Language, {
        foreignKey: "language_id",
        as: "language",
      });
      Projects.belongsTo(models.Type, {
        foreignKey: "type_id",
        as: "type",
      });
    }
  }
  Projects.init(
    {
      title: DataTypes.STRING,
      type_id: DataTypes.UUID,
      author_id: DataTypes.UUID,
      album_id: DataTypes.UUID,
      series_id: DataTypes.UUID,
      language_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Projects",
    }
  );
  return Projects;
};
