const { scrapperDbService } = require("../services/db/scrapperDb.js");
const { downloadService } = require("../services/download");
const { logService } = require("../services/log");
const { scrapperService } = require("../services/scrapper");
// const { Projects, Tag } = require("../../../models");

const initiateScrapper = async () => {
  logService.clearLogs();
  downloadService.clearDownloads();
  logService.addToLog("Scrapper is started");
  // const data = await Projects.findAll({
  //   include: [Tag, "author", "language", "series", "type"],
  // });
  await scrapperDbService.prepeareServiceToScrap();
  await scrapperService.readMainPage();
};

module.exports = { initiateScrapper };
