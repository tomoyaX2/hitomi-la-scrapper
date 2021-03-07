import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface AlbumFields {
  id?: string;
  name: string;
  Images: any[];
}

export interface AlbumModel extends Model<AlbumFields>, AlbumFields {}
export type AlbumStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): AlbumModel;
};
export const AlbumFactory = (sequelize: Sequelize): AlbumStatic => {
  const Album = <AlbumStatic>sequelize.define("Album", {
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

  return Album;
};
