import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface ProjectTagFields {
  id: string;
  ProjectId: string;
  TagId: string;
}

export interface ProjectTagModel
  extends Model<ProjectTagFields>,
    ProjectTagFields {}

export type ProjectTagStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProjectTagModel;
};

export const ProjectTagFactory = (sequelize: Sequelize): ProjectTagStatic => {
  const ProjectTag = <ProjectTagStatic>sequelize.define("ProjectTag", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    ProjectId: DataTypes.UUID,
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

  return ProjectTag;
};
