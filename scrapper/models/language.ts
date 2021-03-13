import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface LanguageFields {
  id?: string;
  name: string;
  abbr: string;
}

export interface LanguageModel extends Model<LanguageFields>, LanguageFields {}

export type LanguageStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): LanguageModel;
};

export const LanguageFactory = (sequelize: Sequelize): LanguageStatic => {
  const Language = <LanguageStatic>sequelize.define("Language", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: DataTypes.STRING,
    abbr: DataTypes.STRING,
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

  return Language;
};
