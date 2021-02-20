const cherio = require("cheerio");
const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: true });
const { appUrl } = require("../../../utils/constants.js");

class SelectElementService {
  readPageBody = async (url) => {
    const parentData = await nightmare
      .goto(url)
      .wait("body")
      .evaluate(() => document.querySelector("body").innerHTML);
    return parentData;
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
        referer: `${appUrl}${referer}`,
      });
    });
    return isImage ? data[0] : data;
  };
}

const selectElementService = new SelectElementService();

module.exports = { selectElementService };
