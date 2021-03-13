import { getMangaDataService } from "../services";

export const getSingleMangaController = async (req, res) => {
  const manga = await getMangaDataService.getManga(req.params.id);
  res.send(manga);
};
