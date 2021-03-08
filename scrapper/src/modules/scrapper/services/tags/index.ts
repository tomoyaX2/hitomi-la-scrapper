import { Tag } from "../../../../models";
import uuid from "uuid";

class TagsService {
  constructor(public dbService) {}
  parseTagsData = async (tags, projectId) => {
    const parsedTags = tags.map(({ title }) => ({
      name: title.replace("♂", "").replace("♀", "").replace(" ", ""),
      type: title.includes("♂") ? "male" : "female",
    }));
    const savedTags = await this.saveTags(parsedTags);
    await this.dbService.createProjectTagRelation(projectId, savedTags);
    return savedTags;
  };

  saveTags = async (tags) => {
    const result = [];
    for (let tag of tags) {
      const existed = await Tag.findOne({
        where: { name: tag.name, type: tag.type },
      });
      if (!existed) {
        const created = await Tag.create(tag);
        result.push(created);
      } else {
        result.push(existed);
      }
    }
    console.log(result, "result");
    return result.map((el) => el.id);
  };
}

export { TagsService };
