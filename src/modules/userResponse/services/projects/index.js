const { Projects } = require("../../../../../models");
const { paramsService } = require("../params");

class ResponseProjectsService {
  getAllProjects = async () => {
    const dbData = await Projects.findAll({
      limit: paramsService.params.limit,
      offset: paramsService.params.offset,
      order: [paramsService.params.order],
    });
    const data = JSON.parse(JSON.stringify(dbData));
    return data;
  };

  getProject = (id) => {
    const dbData = Project.findOne({ where: { id } });
    const data = JSON.parse(JSON.stringify(dbData));
    return data;
  };
}

const responseProjectsService = new ResponseProjectsService();

module.exports = { responseProjectsService };
