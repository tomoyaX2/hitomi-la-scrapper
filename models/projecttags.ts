import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface ProjectTagsFields {
  id: string;
  ProjectId: string;
  TagId: string;
}

export interface ProjectTagsModel
  extends Model<ProjectTagsFields>,
    ProjectTagsFields {}

export type ProjectTagsStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProjectTagsModel;
};

export const ProjectTagsFactory = (sequelize: Sequelize): ProjectTagsStatic => {
  const ProjectTags = <ProjectTagsStatic>sequelize.define("ProjectTags", {
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

  return ProjectTags;
};
