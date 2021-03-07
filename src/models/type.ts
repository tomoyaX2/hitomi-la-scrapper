import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface TypeFields {
  id?: string;
  name: string;
}

export interface TypeModel extends Model<TypeFields>, TypeFields {}

export type TypeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TypeModel;
};

export const TypeFactory = (sequelize: Sequelize): TypeStatic => {
  const Type = <TypeStatic>sequelize.define("Type", {
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

  return Type;
};
