import express from "express";
import { paramsService, getMangaDataService } from "../services";
const mangaRouter = express.Router();

mangaRouter.get("/", async (req, res) => {
  paramsService.parseRequestQuery(req.query);
  const manga = await getMangaDataService.getAllManga();
  res.send(manga);
});

mangaRouter.get("/:id", async (req, res) => {
  const manga = await getMangaDataService.getManga(req.params.id);
  res.send(manga);
});

export { mangaRouter };
