import { AlbumFactory } from "./album";
import { AlbumImagesFactory } from "./albumimages";
import { CredentialsFactory } from "./credentials";
import { ImagesFactory } from "./images";
import { LanguageFactory } from "./language";
import { AuthorFactory } from "./author";
import { UserFactory } from "./user";
import { TypeFactory } from "./type";
import { SeriesFactory } from "./series";
import { TagFactory } from "./tag";
import { ProjectTagsFactory } from "./projecttags";
import { ProjectsFactory } from "./projects";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}
const Album = AlbumFactory(sequelize);
const Images = ImagesFactory(sequelize);
const AlbumImages = AlbumImagesFactory(sequelize);
const Language = LanguageFactory(sequelize);
const Credentials = CredentialsFactory(sequelize);
const Author = AuthorFactory(sequelize);
const User = UserFactory(sequelize);
const Type = TypeFactory(sequelize);
const Series = SeriesFactory(sequelize);
const Tag = TagFactory(sequelize);
const ProjectTags = ProjectTagsFactory(sequelize);
const Projects = ProjectsFactory(sequelize);

Album.belongsToMany(Images, {
  through: "AlbumImages",
});
Tag.belongsToMany(Projects, {
  through: "ProjectTags",
});
Credentials.belongsTo(User, { foreignKey: "user_id" });
Projects.belongsToMany(Tag, {
  through: "ProjectTags",
});
Projects.belongsTo(Author, {
  foreignKey: "author_id",
  as: "author",
});
Projects.belongsTo(Album, {
  foreignKey: "album_id",
});
Projects.belongsTo(Series, {
  foreignKey: "series_id",
  as: "series",
});
Projects.belongsTo(Projects, {
  foreignKey: "language_id",
  as: "language",
});
Projects.belongsTo(Type, {
  foreignKey: "type_id",
  as: "type",
});
Projects.belongsTo(User, {
  foreignKey: "user_id",
});

export {
  Album,
  Images,
  AlbumImages,
  Language,
  Credentials,
  Author,
  User,
  Type,
  Series,
  Tag,
  ProjectTags,
  Projects,
  sequelize,
};
