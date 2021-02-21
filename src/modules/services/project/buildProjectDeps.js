const { tagsService } = require("../tags/index.js");
const { seriesService } = require("../series/index.js");
const { authorService } = require("../author/index.js");
const { languageService } = require("../language/index.js");
const { typesService } = require("../type/index.js");
const { selectors } = require("../../../utils/selectors.js");
const cherio = require("cheerio");
const { typeList } = require("../../../utils/constants.js");

class BuildProjectDepsService {
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

  initiateSeriesRead = (parentData) => {
    const list = this.selectLinkElementContent(
      selectors({ parentData }).project.series
    );
    const series = list.find((el) => el.link.includes("series"));
    if (!!series) {
      return seriesService.parseSeriesData(series.title);
    }
  };

  initiateAuthorRead = (parentData) => {
    const list = this.selectLinkElementContent(
      selectors({ parentData }).project.author
    );
    const author = list.find((el) => el.link.includes("artist"));
    if (!!author) {
      return authorService.parseAuthorData(author.title);
    }
  };

  initiateTypeRead = (parentData) => {
    const list = this.selectLinkElementContent(
      selectors({ parentData }).project.type
    );
    const type = list.find((el) =>
      typeList.some((type) => el.title.includes(type))
    );
    const validType = typeList.find((el) => type.title.includes(el));
    if (!!validType) {
      return typesService.parseTypeData(validType);
    }
  };

  initiateLanguageRead = (parentData) => {
    const list = this.selectLinkElementContent(
      selectors({ parentData }).project.language
    );
    const languageItem = list.find((el) => el.link.includes("index"));
    const language = {
      name: languageItem.title,
      abbr: languageItem.link.split("-")[1].replace(".html", ""),
    };
    if (!!language) {
      return languageService.parseLanguageData(language);
    }
  };

  initiate = async (parentData) => {
    const seriesId = this.initiateSeriesRead(parentData);
    const authorId = this.initiateAuthorRead(parentData);
    const languageId = this.initiateLanguageRead(parentData);
    const typeId = this.initiateTypeRead(parentData);
    return { seriesId, authorId, languageId, typeId, parentData };
  };
}

const buildProjectDepsService = new BuildProjectDepsService();

module.exports = { buildProjectDepsService };
