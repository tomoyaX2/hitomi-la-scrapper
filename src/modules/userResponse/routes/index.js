const express = require("express");
const { paramsService } = require("../services/params");
const { responseProjectsService } = require("../services/projects");
const router = express.Router();

router.get("/", async (req, res) => {
  paramsService.parseRequestQuery(req.query);
  const projects = await responseProjectsService.getAllProjects();
  res.send(projects);
});

router.get("/:id", (req, res) => {
  console.log(`projects requested with id: ${req.params.id}`);
});

module.exports = router;
