const cherio = require("cheerio");
const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: true });
const { appUrl } = require("../../../utils/constants.js");
const { selectors } = require("../../../utils/selectors.js");
const { logService } = require("../log/index.js");

class SelectElementService {
  readPageBody = async (url) => {
    try {
      const parentData = await nightmare
        .goto(url)
        .wait("body")
        .evaluate(() => document.querySelector("body").innerHTML);
      return parentData;
    } catch (e) {
      logService.writeLog();
      console.log("error happen", e, url);
      return null;
    }
  };

  selectLinkElementContent = ({
    parentData,
    isImage = false,
    referer = "",
    title,
    selector = "",
  }) => {
    const data = [];
    const $ = cherio.load(parentData);
    $(selector).each((i, element) => {
      data.push({
        link: isImage ? $(element).attr("src") : $(element).attr("href"),
        title: !!title ? title : $(element).text(),
        referer,
      });
    });
    return isImage ? data[0] : data;
  };

  selectPageData = async ({ link, ...data }) => {
    const parentData = await this.readPageBody(link);
    if (!parentData) {
      return null;
    }
    const mainPageData = await this.selectLinkElementContent({
      ...data,
      parentData,
    });
    return mainPageData;
  };

  selectPageDataForDownload = async (album) => {
    const result = [];
    for (let el of album) {
      const galleryPage = await this.selectPageData(
        selectors({ ...el, link: `${appUrl}${el.link}` }).galleryPages
      );
      result.push(galleryPage);
    }
    return result;
  };
}

const selectElementService = new SelectElementService();

module.exports = { selectElementService };
