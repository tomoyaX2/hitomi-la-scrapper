import express from "express";
import { initiateController } from "./controllers/initiate.controller";
import { stopController } from "./controllers/stop.controller";

const scrapperRouter = express.Router();

scrapperRouter.get("/", initiateController);

scrapperRouter.get("/stop", stopController);

export { scrapperRouter };
