const {
  Tag,
  Series,
  Author,
  Language,
  Type,
  Projects,
  Album,
  Images,
} = require("../../../../models");

class ScrapperDbService {
  tags = [];
  series = [];
  authors = [];
  languages = [];
  types = [];
  projects = [];
  albums = [];
  currentProject = {};

  setCurrentProject = (project) => {
    this.currentProject = project;
  };

  selectTagsList = async () => {
    const dbData = await Tag.findAll();
    const formatted = JSON.parse(JSON.stringify(dbData));
    this.tags = formatted;
  };

  selectSeriesList = async () => {
    const dbData = await Series.findAll();
    const formatted = JSON.parse(JSON.stringify(dbData));
    this.series = formatted;
  };

  selectAuthorsList = async () => {
    const dbData = await Author.findAll();
    const formatted = JSON.parse(JSON.stringify(dbData));
    this.authors = formatted;
  };

  selectLanguagesList = async () => {
    const dbData = await Language.findAll();
    const formatted = JSON.parse(JSON.stringify(dbData));
    this.languages = formatted;
  };

  selectTypesList = async () => {
    const dbData = await Type.findAll();
    const formatted = JSON.parse(JSON.stringify(dbData));
    this.types = formatted;
  };

  selectProjectsList = async () => {
    const dbData = await Projects.findAll();
    const formatted = JSON.parse(JSON.stringify(dbData));
    this.projects = formatted;
  };

  selectAlbumList = async () => {
    const dbData = await Album.findAll();
    const formatted = JSON.parse(JSON.stringify(dbData));
    this.albums = formatted;
  };

  pushTags = async (tags) => {
    this.tags = [...this.tags, ...tags];
    for (let tag of tags) {
      await Tag.create(tag);
    }
  };

  pushSeries = async (series) => {
    this.series = [...this.series, series];
    await Series.create(series);
  };

  pushAuthor = async (author) => {
    this.authors = [...this.authors, author];
    await Author.create(author);
  };

  pushLanguage = async (language) => {
    this.languages = [...this.languages, language];
    await Language.create(language);
  };

  pushType = async (type) => {
    this.types = [...this.types, type];
    await Type.create(type);
  };

  pushProject = async (project) => {
    this.projects = [...this.projects, project];
    await Projects.create(project);
  };

  pushAlbum = async (album) => {
    this.albums = [...this.albums, album];
    await Album.create(album);
  };

  pushImage = async (image) => {
    console.log(image, "imgag");
    await Images.create(image);
  };

  prepeareServiceToScrap = async () => {
    this.currentProject = {};
    const promises = [
      this.selectTagsList(),
      this.selectSeriesList(),
      this.selectAuthorsList(),
      this.selectLanguagesList(),
      this.selectTypesList(),
      this.selectProjectsList(),
      this.selectAlbumList(),
    ];
    await Promise.all(promises);
  };
}

const scrapperDbService = new ScrapperDbService();

module.exports = { scrapperDbService };
