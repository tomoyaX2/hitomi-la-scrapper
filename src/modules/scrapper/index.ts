import {
  scrapperDbService,
  downloadService,
  logService,
  scrapperService,
} from "./services";
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

export { initiateScrapper };
