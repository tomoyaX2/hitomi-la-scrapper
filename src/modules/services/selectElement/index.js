const cherio = require("cheerio");
const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: true });
const { appUrl } = require("../../../utils/constants.js");
const { selectors } = require("../../../utils/selectors.js");
const { logService } = require("../log/index.js");
const { projectService } = require("../project/index.js");
const { buildProjectDepsService } = require("../project/buildProjectDeps.js");
const { tagsService } = require("../tags/index.js");

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

  initiateTagsRead = async (parentData) => {
    const tagsContent = this.selectLinkElementContent(
      selectors({ parentData }).tags
    );
    return await tagsService.parseTagsData(tagsContent);
  };

  selectPageContent = async ({
    link,
    hasToScrapProjectData = false,
    ...data
  }) => {
    const parentData = await this.readPageBody(link);
    if (!parentData) {
      return null;
    }
    const content = await this.selectLinkElementContent({
      ...data,
      parentData,
    });
    if (hasToScrapProjectData) {
      const projectDeps = await buildProjectDepsService.initiate(parentData);
      const projectId = await projectService.selectProjectContent(projectDeps);
      await this.initiateTagsRead(parentData);
    }
    return { content };
  };
  selectPageDataForDownload = async (album) => {
    const result = [];
    for (let el of album) {
      const { content } = await this.selectPageContent(
        selectors({ ...el, link: `${appUrl}${el.link}` }).galleryPages
      );
      result.push(content);
    }
    return result;
  };
}

const selectElementService = new SelectElementService();

module.exports = { selectElementService };
