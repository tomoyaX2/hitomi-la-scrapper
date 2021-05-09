import express from "express";
import { getVideosController } from "../controllers/getVideos.controller";
const videosRouter = express.Router();

videosRouter.get("/", getVideosController);

videosRouter.get("/:id", async (req, res) => {
  console.log(`video requested with id: ${req.params.id}`);
  res.send("video requested");
});

export { videosRouter };
