import { AlbumFactory } from "./album";
import { AlbumImageFactory } from "./albumimage";
import { CredentialsFactory } from "./credentials";
import { ImagesFactory } from "./images";
import { LanguageFactory } from "./language";
import { AuthorFactory } from "./author";
import { UserFactory } from "./user";
import { TypeFactory } from "./type";
import { SeriesFactory } from "./series";
import { TagFactory } from "./tag";
import { ProjectTagFactory } from "./projecttag";
import { ProjectFactory } from "./project";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/config.json")[env];

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
const Image = ImagesFactory(sequelize);
const AlbumImage = AlbumImageFactory(sequelize);
const Language = LanguageFactory(sequelize);
const Credentials = CredentialsFactory(sequelize);
const Author = AuthorFactory(sequelize);
const User = UserFactory(sequelize);
const Type = TypeFactory(sequelize);
const Series = SeriesFactory(sequelize);
const Tag = TagFactory(sequelize);
const ProjectTag = ProjectTagFactory(sequelize);
const Project = ProjectFactory(sequelize);

Album.belongsToMany(Image, {
  through: "AlbumImages",
});
Tag.belongsToMany(Project, {
  through: "ProjectTags",
});
Credentials.belongsTo(User, { foreignKey: "user_id" });
Project.belongsToMany(Tag, {
  through: "ProjectTags",
});
Project.belongsTo(Author, {
  foreignKey: "author_id",
  as: "author",
});
Project.belongsTo(Album, {
  foreignKey: "album_id",
});
Project.belongsTo(Series, {
  foreignKey: "series_id",
  as: "series",
});
Project.belongsTo(Project, {
  foreignKey: "language_id",
  as: "language",
});
Project.belongsTo(Type, {
  foreignKey: "type_id",
  as: "type",
});
Project.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});
Image.belongsToMany(Album, {
  through: "AlbumImages",
});

export {
  Album,
  Image,
  AlbumImage,
  Language,
  Credentials,
  Author,
  User,
  Type,
  Series,
  Tag,
  ProjectTag,
  Project,
  sequelize,
};
