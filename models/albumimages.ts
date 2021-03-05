import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface AlbumImagesFields {
  id: string;
  ImageId: string;
  AlbumId: string;
}

export interface AlbumImagesModel
  extends Model<AlbumImagesFields>,
    AlbumImagesFields {}

export type AlbumImagesStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): AlbumImagesModel;
};

export const AlbumImagesFactory = (sequelize: Sequelize): AlbumImagesStatic => {
  const AlbumImages = <AlbumImagesStatic>sequelize.define("AlbumImages", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    ImageId: DataTypes.UUID,
    AlbumId: DataTypes.UUID,
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

  return AlbumImages;
};
