const express = require("express");
const { paramsService, getProjectsDataService } = require("../services");
const projectsRouter = express.Router();

projectsRouter.get("/", async (req, res) => {
  paramsService.parseRequestQuery(req.query);
  const projects = await getProjectsDataService.getAllProjects();
  res.send(projects);
});

projectsRouter.get("/:id", async (req, res) => {
  console.log(`projects requested with id: ${req.params.id}`);
  const project = await getProjectsDataService.getProject(req.params.id);
  res.send(project);
});

export { projectsRouter };
