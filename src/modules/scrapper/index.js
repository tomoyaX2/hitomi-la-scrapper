const { downloadService } = require("../services/download");
const { logService } = require("../services/log");
const { mainPageService } = require("../services/mainPage");

const initiateScrapper = async () => {
  logService.clearLogs();
  downloadService.clearDownloads();
  await mainPageService.readMainPage();
};

module.exports = { initiateScrapper };
