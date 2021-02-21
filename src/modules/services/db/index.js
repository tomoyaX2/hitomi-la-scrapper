const {
  Tag,
  Series,
  Author,
  Language,
  Type,
  Projects,
} = require("../../../../models");

class DbService {
  tags = [];
  series = [];
  authors = [];
  languages = [];
  types = [];
  projects = [];

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

  prepeareServiceToScrap = async () => {
    await this.selectTagsList();
    await this.selectSeriesList();
    await this.selectAuthorsList();
    await this.selectLanguagesList();
    await this.selectTypesList();
    await this.selectProjectsList()
  };
}

const dbService = new DbService();

module.exports = { dbService };
