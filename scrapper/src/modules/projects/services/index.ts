import { GetProjectsDataService } from "./getProjectsData";
import { ParamsService } from "./params";

const paramsService = new ParamsService();
const getProjectsDataService = new GetProjectsDataService(paramsService);

export { paramsService, getProjectsDataService };
