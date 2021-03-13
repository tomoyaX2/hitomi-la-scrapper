import { meController } from "../controllers/me.controller";

const express = require("express");
const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  console.log(`users requested`);
  res.send("users requested");
});

usersRouter.get("/me", meController);

usersRouter.get("/:id", async (req, res) => {
  console.log(`user requested with id: ${req.params.id}`);
  res.send("user requested");
});

export { usersRouter };
