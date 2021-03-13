import { appUrl, isInTestMode } from "../../utils/constants";
import { selectors } from "../../utils/selectors";

class ScrapperService {
  constructor(
    public scrapperDbService,
    public logService,
    public downloadService,
    public selectElementService
  ) {}
  retryIndex = 0;
  state = {
    currentIndex: 0,
    page: { data: [], index: 1 },
    currentPageUrl: appUrl,
  };

  initiateRetry = () => {
    if (this.retryIndex < 4) {
      setTimeout(() => {
        this.retryIndex++;
        this.readMainPage();
        this.logService.addToLog(`retry happen`);
      }, 2000);
    } else {
      this.retryIndex = 0;
    }
  };

  readMainPage = async () => {
    this.logService.addToLog(
      `read main page start with url: ${this.state.currentPageUrl}`
    );
    try {
      const { content } = await this.selectElementService.selectPageContent(
        selectors({ link: this.state.currentPageUrl }).mainPage
      );
      if (!content.length) {
        this.initiateRetry();
        return;
      }

      const newMangas = await this.scrapperDbService.filterAlreadyExistedMangas(
        content
      );
      this.state.page.data = newMangas;
      this.retryIndex = 0;
      if (!newMangas.length) {
        return this.moveToNextTitle();
      }
      this.readSinglePageData();
    } catch (e) {
      console.log("retry happen", e);
      this.initiateRetry();
    }
  };

  readSinglePageData = async () => {
    this.logService.addToLog(`read single page data start`);
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
    this.logService.addToLog(
      `read single page start with url: ${appUrl}${link}`
    );
    const { content } = await this.selectElementService.selectPageContent(
      selectors({
        link: `${appUrl}${link}`,
        hasToScrapMangaData: true,
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
    this.logService.addToLog(`read gallery pages start`);
    const content = await this.selectElementService.selectPageDataForDownload(
      album
    );
    await this.downloadService.handleImagesList(content);
    this.moveToNextTitle();
  };

  updateStateWithMovingToNextPage = () => {
    this.state.currentIndex = 0;
    this.state.page.index++;
    this.state.page.data = [];
    this.state.currentPageUrl = `${appUrl}/?page=${this.state.page.index}`;
  };

  moveToNextTitle = () => {
    this.logService.addToLog(
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
      this.logService.writeLog();
    }
  };
}

export { ScrapperService };
