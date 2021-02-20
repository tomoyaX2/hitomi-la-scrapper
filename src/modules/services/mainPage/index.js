const { selectElementService } = require("../selectElement");
const { appUrl, isInTestMode } = require("../../../utils/constants.js");
const { downloadService } = require("../download/index.js");

class MainPageService {
  retryIndex = 0;
  state = {
    currentIndex: 0,
    page: { data: [], index: 1 },
    totalItemsOnPage: 0,
    currentPageUrl: appUrl,
  };

  readMainPage = async () => {
    try {
      const parentData = await selectElementService.readPageBody(
        this.state.currentPageUrl
      );
      const mainPageData = await selectElementService.selectLinkElementContent({
        parentData,
        selector: "h1.lillie a",
      });
      if (!mainPageData.length && this.retryIndex < 4) {
        this.readMainPage();
        this.retryIndex++;
        return;
      }
      this.state.totalItemsOnPage = mainPageData.length;
      this.state.page.data = mainPageData;
      this.readSinglePageData();
    } catch (e) {
      if (this.retryIndex < 4) {
        this.readMainPage();
        this.retryIndex++;
      } else {
        this.retryIndex = 0;
      }
    }
  };

  readSinglePageData = async () => {
    const album = await this.readSingleTitlePage(
      this.state.page.data[this.state.currentIndex]
    );
    this.readGalleryPages(album);
  };

  readSingleTitlePage = async ({ link, title }) => {
    try {
      const parentData = await selectElementService.readPageBody(
        `${appUrl}${link}`
      );
      const data = selectElementService.selectLinkElementContent({
        parentData,
        referer: link,
        title,
        selector: "div.thumbnail-container a",
      });
      return isInTestMode ? [data[0]] : data;
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  readGalleryPages = async (album) => {
    const result = [];
    for (let el of album) {
      const galleryPage = await this.readGalleryPage({
        ...el,
        isImage: true,
      });
      result.push(galleryPage);
    }
    await downloadService.handleImagesList(result);
    this.moveToNextTitle();
  };

  readGalleryPage = async ({ link, isImage, title }) => {
    const parentData = await selectElementService.readPageBody(
      `${appUrl}${link}`
    );
    const data = selectElementService.selectLinkElementContent({
      parentData,
      isImage,
      title,
      referer: link,
      selector: "picture img",
    });
    return data;
  };

  moveToNextTitle = () => {
    console.log(this.state.currentIndex, this.state.totalItemsOnPage, "0000");
    if (this.state.currentIndex < this.state.totalItemsOnPage - 1) {
      this.state.currentIndex++;
      this.readSinglePageData();
    } else {
      this.state.currentIndex = 0;
      this.state.page.index++;
      this.state.currentPageUrl = `${appUrl}/?page=${this.state.page.index}`;
      console.log(`${appUrl}/?page=${this.state.page.index}`, "url");
      this.readMainPage();
      console.log("page end");
    }
  };
}

const mainPageService = new MainPageService();

module.exports = { mainPageService };
