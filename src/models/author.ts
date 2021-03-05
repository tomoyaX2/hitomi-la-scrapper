import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface AuthorFields {
  id: string;
  name: string;
}

export interface AuthorModel extends Model<AuthorFields>, AuthorFields {}

export type AuthorStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): AuthorModel;
};

export const AuthorFactory = (sequelize: Sequelize): AuthorStatic => {
  const Author = <AuthorStatic>sequelize.define("Author", {
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

  return Author;
};
