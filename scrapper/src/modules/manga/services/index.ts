import { GetMangaDataService } from "./getMangaData";
import { ParamsService } from "./params";

const paramsService = new ParamsService();
const getMangaDataService = new GetMangaDataService(paramsService);

export { paramsService, getMangaDataService };
