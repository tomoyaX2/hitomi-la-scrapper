import { initiateScrapper } from ".";
import express from "express";
import { selectElementService } from "./services";
const scrapperRouter = express.Router();

scrapperRouter.get("/", (req, res) => {
  res.send("scrapping is started");
  initiateScrapper();
});

scrapperRouter.get("/stop", (req, res) => {
  res.send("scrapping is stopped");
  selectElementService.stopScrapper();
});

export { scrapperRouter };
