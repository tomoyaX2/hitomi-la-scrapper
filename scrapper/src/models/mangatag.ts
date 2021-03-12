import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface MangaTagFields {
  id?: string;
  MangaId: string;
  TagId: string;
}

export interface MangaTagModel
  extends Model<MangaTagFields>,
    MangaTagFields {}

export type MangaTagStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): MangaTagModel;
};

export const MangaTagFactory = (sequelize: Sequelize): MangaTagStatic => {
  const MangaTag = <MangaTagStatic>sequelize.define("MangaTag", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    MangaId: DataTypes.UUID,
    TagId: DataTypes.UUID,
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

  return MangaTag;
};
