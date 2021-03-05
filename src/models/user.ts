import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface UserFields {
  id: string;
  name: string;
  email: string;
  token?: string;
}

export interface UserModel extends Model<UserFields>, UserFields {}

export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
};

export const UserFactory = (sequelize: Sequelize): UserStatic => {
  const User = <UserStatic>sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    token: DataTypes.STRING,
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

  return User;
};
