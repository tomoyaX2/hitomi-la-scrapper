import { paramsService, getMangaDataService } from "../services";

export const getAllController = async (req, res) => {
  paramsService.parseRequestQuery(req.query);
  const manga = await getMangaDataService.getAllManga();
  res.send(manga);
};
