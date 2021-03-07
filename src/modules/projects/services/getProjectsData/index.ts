const {
  Project,
  Album,
  User,
  Image,
  Type,
  Author,
  Language,
  Series,
  Tag,
} = require("../../../../models");

class GetProjectsDataService {
  constructor(public paramsService) {}
  getAllProjects = async () => {
    const dbData = await Project.findAll({
      limit: this.paramsService.params.limit,
      offset: this.paramsService.params.offset,
      order: [this.paramsService.params.order],
      include: [
        { model: Album, include: Image },
        "user",
        "type",
        "author",
        "language",
        "series",
        Tag,
      ],
    });
    return dbData;
  };

  getProject = async (id) => {
    const dbData = await Project.findOne({ where: { id }, raw: true });
    return dbData;
  };
}

export { GetProjectsDataService };
