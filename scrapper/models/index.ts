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
import { MangaTagFactory } from "./mangatag";
import { MangaFactory } from "./manga";
import { RoleFactory } from "./role";
import { VideoFactory } from "./video";

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
const Image = ImagesFactory(sequelize);
const AlbumImage = AlbumImageFactory(sequelize);
const Language = LanguageFactory(sequelize);
const Credentials = CredentialsFactory(sequelize);
const Author = AuthorFactory(sequelize);
const User = UserFactory(sequelize);
const Type = TypeFactory(sequelize);
const Series = SeriesFactory(sequelize);
const Tag = TagFactory(sequelize);
const MangaTag = MangaTagFactory(sequelize);
const Manga = MangaFactory(sequelize);
const Role = RoleFactory(sequelize);
const Video = VideoFactory(sequelize);

User.belongsTo(Role, { foreignKey: "role_id", as: "role" });
Album.belongsToMany(Image, {
  through: "AlbumImages",
});
Tag.belongsToMany(Manga, {
  through: "MangaTags",
});
Credentials.belongsTo(User, { foreignKey: "user_id" });
Manga.belongsToMany(Tag, {
  through: "MangaTags",
});
Manga.belongsTo(Author, {
  foreignKey: "author_id",
  as: "author",
});
Manga.belongsTo(Album, {
  foreignKey: "album_id",
});
Manga.belongsTo(Series, {
  foreignKey: "series_id",
  as: "series",
});
Manga.belongsTo(Language, {
  foreignKey: "language_id",
  as: "language",
});
Manga.belongsTo(Type, {
  foreignKey: "type_id",
  as: "type",
});
Manga.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});
Image.belongsToMany(Album, {
  through: "AlbumImages",
});
Video.belongsTo(Album, {
  foreignKey: "album_id",
  as: "album",
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
  MangaTag,
  Manga,
  Role,
  Video,
  sequelize,
};
