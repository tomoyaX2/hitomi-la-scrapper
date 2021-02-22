const { Tag, Images } = require("../../../../models");

class ScrapperDbService {
  tags = [];
  currentProject = {};

  pushProjectData = async (Model, data) => {
    console.log("data", data);
    const result = await Model.findOrCreate({
      where: { name: data.name },
      defaults: data,
    });
    return JSON.parse(JSON.stringify(result[0]));
  };

  setCurrentProject = (project) => {
    this.currentProject = project;
  };

  pushTags = async (tags) => {
    this.tags = [...this.tags, ...tags];
    for (let tag of tags) {
      await Tag.create(tag);
    }
  };

  selectTagsList = async () => {
    const dbData = await Tag.findAll();
    const formatted = JSON.parse(JSON.stringify(dbData));
    this.tags = formatted;
  };

  pushImage = async (image) => {
    await Images.create(image);
    console.log("AFTER IMAGE CREATE");
  };

  prepeareServiceToScrap = async () => {
    this.currentProject = {};
    const promises = [this.selectTagsList()];
    await Promise.all(promises);
  };
}

const scrapperDbService = new ScrapperDbService();

module.exports = { scrapperDbService };
