import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface VideoFields {
  id?: string;
  title: string;
  path: string;
  duration: string;
  type: "public" | "private";
  album_id: string
}

export interface VideoModel extends Model<VideoFields>, VideoFields {}

export type VideoStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): VideoModel;
};

export const VideoFactory = (sequelize: Sequelize): VideoStatic => {
  const Video = <VideoStatic>sequelize.define("Video", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    title: DataTypes.STRING,
    path: DataTypes.STRING,
    duration: DataTypes.STRING,
    type: DataTypes.STRING,
    album_id: DataTypes.STRING,
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

  return Video;
};
