import { Tag } from "../../../../models";
import uuid from "uuid";
class TagsService {
  constructor(public dbService) {}
  parseTagsData = async (tags, projectId) => {
    const parsedTags = tags.map(({ title }) => ({
      name: title.replace("♂", "").replace("♀", "").replace(" ", ""),
      type: title.includes("♂") ? "male" : "female",
    }));
    const filtered = await this.filterExistedTags(parsedTags);
    const tagIds = filtered.map((el) => el.id);
    await this.dbService.createProjectTagRelation(projectId, tagIds);
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

export { TagsService };
