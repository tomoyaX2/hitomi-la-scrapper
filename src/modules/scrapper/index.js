const { dbService } = require("../services/db");
const { downloadService } = require("../services/download");
const { logService } = require("../services/log");
const { scrapperService } = require("../services/scrapper");

const initiateScrapper = async () => {
  logService.clearLogs();
  downloadService.clearDownloads();
  logService.addToLog("Scrapper is started");
  await dbService.prepeareServiceToScrap();
  await scrapperService.readMainPage();
};

module.exports = { initiateScrapper };
