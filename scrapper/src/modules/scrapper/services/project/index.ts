import cherio from "cheerio";
import { Project } from "../../../../models";
import uuid from "uuid";
import { selectors } from "../../utils/selectors";

class ProjectService {
  constructor(public albumService, public scrapperDbService) {}
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
    const albumId = await this.albumService.initiateAlbumCreation(titles[0]);
    const project = {
      name: titles[0],
      author_id: authorId,
      series_id: seriesId,
      language_id: languageId,
      type_id: typeId,
      album_id: albumId,
      scrappedFrom: link,
    };
    this.scrapperDbService.setCurrentProject(project);
    return await this.pushData(project);
  };

  pushData = async (project) => {
    const result = await this.scrapperDbService.pushProjectData(
      Project,
      project
    );
    return result.id;
  };
}

export { ProjectService };
