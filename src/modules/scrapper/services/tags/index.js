const { Tag } = require("../../../../../models");
const { dbService } = require("../db");
const uuid = require("uuid");

class TagsService {
  parseTagsData = async (tags, projectId) => {
    const parsedTags = tags.map(({ title }) => ({
      id: uuid.v4(),
      name: title.replace("♂", "").replace("♀", "").replace(" ", ""),
      type: title.includes("♂") ? "male" : "female",
    }));
    const filtered = await this.filterExistedTags(parsedTags);
    const tagIds = filtered.map((el) => el.id);
    await dbService.createProjectTagRelation(projectId, tagIds);
    return filtered;
  };

  filterExistedTags = async (tags) => {
    const result = [];
    for (let tag of tags) {
      const dbTag = await Tag.findOne({
        where: { name: tag.name, type: tag.type },
      });
      if (!dbTag) {
        result.push(tag);
      }
    }
    return result;
  };
}

const tagsService = new TagsService();

module.exports = { tagsService };
