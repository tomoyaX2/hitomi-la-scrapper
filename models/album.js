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
      Album.belongsToMany(models.Images, {
        through: "AlbumImages",
      });
    }
  }

  Album.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Album",
    }
  );
  return Album;
};
