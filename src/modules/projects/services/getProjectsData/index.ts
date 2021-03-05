const { Project } = require("../../../../models");

class GetProjectsDataService {
  constructor(public paramsService) {}
  getAllProjects = async () => {
    const dbData = await Project.findAll({
      limit: this.paramsService.params.limit,
      offset: this.paramsService.params.offset,
      order: [this.paramsService.params.order],
      raw: true,
    });
    return dbData;
  };

  getProject = async (id) => {
    const dbData = await Project.findOne({ where: { id }, raw: true });
    return dbData;
  };
}

export { GetProjectsDataService };
