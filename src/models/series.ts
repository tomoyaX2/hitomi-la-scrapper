import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface SeriesFields {
  id: string;
  name: string;
}

export interface SeriesModel extends Model<SeriesFields>, SeriesFields {}

export type SeriesStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): SeriesModel;
};

export const SeriesFactory = (sequelize: Sequelize): SeriesStatic => {
  const Series = <SeriesStatic>sequelize.define("Series", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  return Series;
};
