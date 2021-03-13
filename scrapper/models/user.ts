import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface UserFields {
  id?: string;
  name: string;
  email: string;
  token?: string;
  code?: string;
  isActive?: boolean;
  phone?: string;
  isTwoFactorActive?: boolean;
  resendTime?: number;
  avatarUrl?: string;
  role_id?: string;
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
    phone: DataTypes.STRING,
    resendTime: DataTypes.NUMBER,
    isTwoFactorActive: { type: DataTypes.BOOLEAN, defaultValue: false },
    role_id: DataTypes.UUID,
    token: DataTypes.STRING,
    avatarUrl: DataTypes.STRING,
    isActive: { type: DataTypes.BOOLEAN, defaultValue: false },
    code: DataTypes.STRING,
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
