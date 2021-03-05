import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface CredentialsFields {
  id: string;
  login: string;
  password: string;
  user_id: string;
}

export interface CredentialsModel
  extends Model<CredentialsFields>,
    CredentialsFields {}

export type CredentialsStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CredentialsModel;
};

export const CredentialsFactory = (sequelize: Sequelize): CredentialsStatic => {
  const Credentials = <CredentialsStatic>sequelize.define("Credentials", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    login: DataTypes.STRING,
    password: DataTypes.STRING,
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

  return Credentials;
};
