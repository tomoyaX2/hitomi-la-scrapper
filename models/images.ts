import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { Album } from "./";

export interface ImagesFields {
  id: string;
  url: string;
  remoteUrl: string;
  referer: string;
  name: string;
}

export interface ImagesModel extends Model<ImagesFields>, ImagesFields {}
export type ImagesStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ImagesModel;
};
export const ImagesFactory = (sequelize: Sequelize): ImagesStatic => {
  const Images = <ImagesStatic>sequelize.define("Images", {
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

  Images.belongsToMany(Album, {
    through: "AlbumImages",
  });
  return Images;
};
