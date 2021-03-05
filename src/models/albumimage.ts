import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface AlbumImageFields {
  id: string;
  ImageId: string;
  AlbumId: string;
}

export interface AlbumImageModel
  extends Model<AlbumImageFields>,
    AlbumImageFields {}

export type AlbumImageStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): AlbumImageModel;
};

export const AlbumImageFactory = (sequelize: Sequelize): AlbumImageStatic => {
  const AlbumImage = <AlbumImageStatic>sequelize.define("AlbumImage", {
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

  return AlbumImage;
};
