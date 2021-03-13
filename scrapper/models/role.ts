import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface RoleFields {
  id?: string;
  name: string;
}

export interface RoleModel extends Model<RoleFields>, RoleFields {}

export type RoleStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): RoleModel;
};

export const RoleFactory = (sequelize: Sequelize): RoleStatic => {
  const Role = <RoleStatic>sequelize.define("Role", {
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

  return Role;
};
