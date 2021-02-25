const express = require("express");
const { paramsService } = require("../services/params");
const { getProjectsDataService } = require("../services/getProjectsData");
const router = express.Router();

router.get("/", async (req, res) => {
  paramsService.parseRequestQuery(req.query);
  const projects = await getProjectsDataService.getAllProjects();
  res.send(projects);
});

router.get("/:id", async (req, res) => {
  console.log(`projects requested with id: ${req.params.id}`);
  const project = await getProjectsDataService.getProject(req.params.id);
  res.send(project);
});

module.exports = router;
