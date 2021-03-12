import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface MangaFields {
  id?: string;
  name: string;
  type_id: string;
  author_id: string;
  album_id: string;
  series_id: string;
  language_id: string;
  scrappedFrom: string;
  user_id: string;
  Tags: any[];
}

export interface MangaModel extends Model<MangaFields>, MangaFields {}

export type MangaStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): MangaModel;
};

export const MangaFactory = (sequelize: Sequelize): MangaStatic => {
  const Manga = <MangaStatic>sequelize.define("Manga", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: DataTypes.STRING,
    type_id: DataTypes.UUID,
    author_id: DataTypes.UUID,
    album_id: DataTypes.UUID,
    series_id: DataTypes.UUID,
    language_id: DataTypes.UUID,
    scrappedFrom: DataTypes.STRING,
    user_id: DataTypes.UUID,
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

  return Manga;
};
