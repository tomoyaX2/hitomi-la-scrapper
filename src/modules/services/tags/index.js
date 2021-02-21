const { dbService } = require("../db");
const uuid = require("uuid");
class TagsService {
  parseTagsData = (tags) => {
    const parsedTags = tags.map(({ title }) => ({
      id: uuid.v4(),
      name: title.replace("♂", "").replace("♀", "").replace(" ", ""),
      type: title.includes("♂") ? "male" : "female",
    }));
    const filtered = this.filterExistedTags(parsedTags);
    return filtered;
  };

  filterExistedTags = (tags) => {
    const filtered = tags.filter(
      (newTag) =>
        !dbService.tags.some(
          (existed) =>
            newTag.name === existed.name && newTag.type === existed.type
        )
    );
    dbService.pushTags(filtered);
  };
}

const tagsService = new TagsService();

module.exports = { tagsService };
