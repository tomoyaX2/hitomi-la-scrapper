const { scrapperDbService } = require("../db/scrapperDb.js");
const { dbService } = require("../db");
const uuid = require("uuid");

class TagsService {
  parseTagsData = async (tags, projectId) => {
    const parsedTags = tags.map(({ title }) => ({
      id: uuid.v4(),
      name: title.replace("♂", "").replace("♀", "").replace(" ", ""),
      type: title.includes("♂") ? "male" : "female",
    }));
    const filtered = this.filterExistedTags(parsedTags);
    const tagIds = scrapperDbService.tags.map((el) => el.id);
    await dbService.createProjectTagRelation(projectId, tagIds);
    return filtered;
  };

  filterExistedTags = (tags) => {
    const filtered = tags.filter(
      (newTag) =>
        !scrapperDbService.tags.some(
          (existed) =>
            newTag.name === existed.name && newTag.type === existed.type
        )
    );
    scrapperDbService.pushTags(filtered);
    return filtered;
  };
}

const tagsService = new TagsService();

module.exports = { tagsService };
