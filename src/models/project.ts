import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface ProjectFields {
  id: string;
  name: string;
  type_id: string;
  author_id: string;
  album_id: string;
  series_id: string;
  language_id: string;
  scrappedFrom: string;
  user_id: string;
  Tags: any[];
}

export interface ProjectModel extends Model<ProjectFields>, ProjectFields {}

export type ProjectStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProjectModel;
};

export const ProjectFactory = (sequelize: Sequelize): ProjectStatic => {
  const Project = <ProjectStatic>sequelize.define("Project", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: DataTypes.STRING,
    type_id: DataTypes.UUID,
    author_id: DataTypes.UUID,
    album_id: DataTypes.UUID,
    series_id: DataTypes.UUID,
    language_id: DataTypes.UUID,
    scrappedFrom: DataTypes.STRING,
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

  return Project;
};
