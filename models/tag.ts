import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface TagFields {
  id: string;
  name: string;
  type: string;
}

export interface TagModel extends Model<TagFields>, TagFields {}

export type TagStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TagModel;
};

export const TagFactory = (sequelize: Sequelize): TagStatic => {
  const Tag = <TagStatic>sequelize.define("Tag", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
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

  return Tag;
};
