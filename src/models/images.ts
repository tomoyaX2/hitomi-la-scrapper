import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { Album } from ".";

export interface ImageFields {
  id: string;
  url: string;
  remoteUrl: string;
  referer: string;
  name: string;
}

export interface ImageModel extends Model<ImageFields>, ImageFields {}
export type ImageStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ImageModel;
};
export const ImagesFactory = (sequelize: Sequelize): ImageStatic => {
  const Image = <ImageStatic>sequelize.define("Image", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    url: DataTypes.STRING,
    remoteUrl: DataTypes.STRING,
    referer: DataTypes.STRING,
    name: DataTypes.STRING,
  });
  return Image;
};
