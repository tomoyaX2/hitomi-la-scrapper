const { selectElementService } = require("../selectElement");
const { appUrl, isInTestMode } = require("../../../utils/constants.js");
const { downloadService } = require("../download/index.js");
const { logService } = require("../log");
const { selectors } = require("../../../utils/selectors");
const { albumService } = require("../album");

class ScrapperService {
  retryIndex = 0;
  state = {
    currentIndex: 0,
    page: { data: [], index: 1 },
    currentPageUrl: appUrl,
  };

  readMainPage = async () => {
    logService.addToLog(
      `read main page start with url: ${this.state.currentPageUrl}`
    );
    try {
      const { content } = await selectElementService.selectPageContent(
        selectors({ link: this.state.currentPageUrl }).mainPage
      );
      if (!content.length && this.retryIndex < 4) {
        setTimeout(() => {
          this.retryIndex++;
          this.readMainPage();
          logService.addToLog(`retry scrap happen`);
          console.log("retry scrap happen");
        }, 2000);
        return;
      }
      this.state.page.data = content;
      this.retryIndex = 0;
      this.readSinglePageData();
    } catch (e) {
      console.log("retry happen");
      if (this.retryIndex < 4) {
        this.readMainPage();
        this.retryIndex++;
      } else {
        this.retryIndex = 0;
      }
    }
  };

  readSinglePageData = async () => {
    logService.addToLog(`read single page data start`);
    const { album } = await this.readSingleTitlePage(
      this.state.page.data[this.state.currentIndex]
    );
    if (!album) {
      this.moveToNextTitle();
      return;
    }
    this.readGalleryPages(album);
  };

  readSingleTitlePage = async ({ link, ...el }) => {
    logService.addToLog(`read single page start with url: ${appUrl}${link}`);
    const { content } = await selectElementService.selectPageContent(
      selectors({
        link: `${appUrl}${link}`,
        hasToScrapProjectData: true,
        ...el,
      }).singleTitle
    );
    return {
      album: Array.isArray(content)
        ? isInTestMode
          ? [content[0]]
          : content
        : null,
    };
  };

  readGalleryPages = async (album) => {
    logService.addToLog(`read gallery pages start`);
    const content = await selectElementService.selectPageDataForDownload(album);
    const albumData = await albumService.initiateAlbumCreation();
    await downloadService.handleImagesList(content, albumData);
    this.moveToNextTitle();
  };

  updateStateWithMovingToNextPage = () => {
    this.state.currentIndex = 0;
    this.state.page.index++;
    this.state.page.data = [];
    this.state.currentPageUrl = `${appUrl}/?page=${this.state.page.index}`;
  };

  moveToNextTitle = () => {
    console.log(
      this.state.currentIndex,
      this.state.page.data.length - 1,
      "current state"
    );
    logService.addToLog(
      `move to next title initiate. currentIndex: ${JSON.stringify(
        this.state.currentIndex
      )}, totalItems: ${this.state.page.data.length - 1}`
    );
    if (this.state.currentIndex < this.state.page.data.length - 1) {
      this.state.currentIndex++;
      this.readSinglePageData();
    } else {
      this.updateStateWithMovingToNextPage();
      this.readMainPage();
      logService.writeLog();
    }
  };
}

const scrapperService = new ScrapperService();

module.exports = { scrapperService };
