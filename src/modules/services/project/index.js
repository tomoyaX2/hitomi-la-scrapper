const cherio = require("cheerio");
const { selectors } = require("../../../utils/selectors.js");
const { logService } = require("../log/index.js");
const uuid = require("uuid");
const { scrapperDbService } = require("../db/scrapperDb.js");

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
      type_id: typeId,
      album_id: null,
    };
    scrapperDbService.setCurrentProject(project);
    return this.filterExistedProject(project);
  };

  filterExistedProject = (project) => {
    const existed = scrapperDbService.projects.find(
      (el) => el.title === project.title
    );
    if (!existed) {
      scrapperDbService.pushProject(project);
      return project.id;
    }
    return existed.id;
  };
}

const projectService = new ProjectService();

module.exports = { projectService };
