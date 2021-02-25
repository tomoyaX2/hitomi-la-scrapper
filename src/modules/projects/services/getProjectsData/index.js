const { Projects } = require("../../../../../models");
const { paramsService } = require("../params");

class GetProjectsDataService {
  getAllProjects = async () => {
    const dbData = await Projects.findAll({
      limit: paramsService.params.limit,
      offset: paramsService.params.offset,
      order: [paramsService.params.order],
      raw: true,
    });
    return dbData;
  };

  getProject = async (id) => {
    const dbData = await Projects.findOne({ where: { id }, raw: true });
    return dbData;
  };
}

const getProjectsDataService = new GetProjectsDataService();

module.exports = { getProjectsDataService };
