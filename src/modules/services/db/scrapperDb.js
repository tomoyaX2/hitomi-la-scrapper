const { Tag, Images, Projects } = require("../../../../models");
const { appUrl } = require("../../../utils/constants");

class ScrapperDbService {
  tags = [];
  currentProject = {};

  pushProjectData = async (Model, data) => {
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

  filterAlreadyExistedProjects = async (projects) => {
    const result = [];
    for (let project of projects) {
      const dbProject = await Projects.findOne({
        where: {
          name: project.title,
          scrappedFrom: `${appUrl}${project.link}`,
        },
      });
      if (!dbProject) {
        result.push(project);
      }
    }
    return result;
  };

  pushImage = async (image) => {
    await Images.create(image);
  };

  prepeareServiceToScrap = async () => {
    this.currentProject = {};
    const promises = [this.selectTagsList()];
    await Promise.all(promises);
  };
}

const scrapperDbService = new ScrapperDbService();

module.exports = { scrapperDbService };
