const { scrapperDbService } = require("./services/db/scrapperDb.js");
const { downloadService } = require("./services/download");
const { logService } = require("./services/log");
const { scrapperService } = require("./services/scrapper");
// const { Projects, Tag, Images, Album } = require("../../../models");

const initiateScrapper = async () => {
  logService.clearLogs();
  downloadService.clearDownloads();
  logService.addToLog("Scrapper is started");
  // const projecData = await Projects.findOne({
  //   where: { id: "0b64fb3f-03b8-4e9a-b847-a7c01a968a0d" },
  //   include: [{ model: Album, include: Images }],
  // });
  await scrapperDbService.prepeareServiceToScrap();
  await scrapperService.readMainPage();
};

module.exports = { initiateScrapper };
