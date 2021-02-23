const cherio = require("cheerio");
const { selectors } = require("../../utils/selectors.js");
const { logService } = require("../log/index.js");
const uuid = require("uuid");
const { scrapperDbService } = require("../db/scrapperDb.js");
const { Projects } = require("../../../../../models");
const { albumService } = require("../album/index.js");

class ProjectService {
  selectProjectContent = async ({
    parentData,
    seriesId,
    authorId,
    languageId,
    typeId,
    link,
  }) => {
    const $ = cherio.load(parentData);
    const titles = [];
    $(selectors().project.title).each((i, element) => {
      titles.push($(element).text());
    });
    const albumId = await albumService.initiateAlbumCreation(titles[0]);
    const project = {
      id: uuid.v4(),
      name: titles[0],
      author_id: authorId,
      series_id: seriesId,
      language_id: languageId,
      type_id: typeId,
      album_id: albumId,
      scrappedFrom: link,
    };
    scrapperDbService.setCurrentProject(project);
    return await this.pushData(project);
  };

  pushData = async (project) => {
    const result = await scrapperDbService.pushProjectData(Projects, project);
    return result.id;
  };
}

const projectService = new ProjectService();

module.exports = { projectService };
