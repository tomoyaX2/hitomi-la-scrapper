"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Album.belongsTo(models.Projects, {
        foreignKey: "project_id",
        as: "album",
      });
      Album.hasMany(models.Images, { foreignKey: "album_id", as: "images" });
    }
  }
  Album.init(
    {
      project_id: DataTypes.UUID,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Album",
    }
  );
  return Album;
};
