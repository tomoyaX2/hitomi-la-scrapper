import express from "express";
import { getAllController } from "../controllers/getAll.controller";
import { getSingleMangaController } from "../controllers/getSingleMangacontroller.";

const mangaRouter = express.Router();

mangaRouter.get("/:id", getSingleMangaController);

mangaRouter.get("/", getAllController);

export { mangaRouter };
