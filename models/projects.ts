import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface ProjectsFields {
  id: string;
  name: string;
  type_id: string;
  author_id: string;
  album_id: string;
  series_id: string;
  language_id: string;
  scrappedFrom: string;
  user_id: string;
}

export interface ProjectsModel extends Model<ProjectsFields>, ProjectsFields {}

export type ProjectsStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProjectsModel;
};

export const ProjectsFactory = (sequelize: Sequelize): ProjectsStatic => {
  const Projects = <ProjectsStatic>sequelize.define("Projects", {
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

  return Projects;
};
