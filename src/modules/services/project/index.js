const cherio = require("cheerio");
const { selectors } = require("../../../utils/selectors.js");
const { logService } = require("../log/index.js");
const uuid = require("uuid");
const { dbService } = require("../db/index.js");

class ProjectService {
  selectProjectContent = ({
    parentData,
    seriesId,
    authorId,
    languageId,
    typeId,
  }) => {
    const $ = cherio.load(parentData);
    const titles = [];
    $(selectors().project.title).each((i, element) => {
      titles.push($(element).text());
    });
    const project = {
      id: uuid.v4(),
      title: titles[0],
      author_id: authorId,
      series_id: seriesId,
      language_id: languageId,
      types_id: typeId,
      album_id: null,
    };
    return this.filterExistedProject(project);
  };

  filterExistedProject = (project) => {
    const existed = dbService.projects.find((el) => el.title === project.title);
    if (!existed) {
      dbService.pushProject(project);
      return project.id;
    }
    return existed.id;
  };
}

const projectService = new ProjectService();

module.exports = { projectService };
