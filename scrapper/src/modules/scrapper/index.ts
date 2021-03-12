import {
  scrapperDbService,
  downloadService,
  logService,
  scrapperService,
} from "./services";

const initiateScrapper = async () => {
  logService.clearLogs();
  downloadService.clearDownloads();
  logService.addToLog("Scrapper is started");
  await scrapperDbService.prepeareServiceToScrap();
  await scrapperService.readMainPage();
};

export { initiateScrapper };
