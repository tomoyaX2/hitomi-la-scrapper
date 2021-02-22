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

  initiateSeriesRead = async (parentData) => {
    const list = this.selectLinkElementContent(
      selectors({ parentData }).project.series
    );
    const series = list.find((el) => el.link.includes("series"));
    if (!!series) {
      return await seriesService.parseSeriesData(series.title);
    }
    return null;
  };

  initiateAuthorRead = async (parentData) => {
    const list = this.selectLinkElementContent(
      selectors({ parentData }).project.author
    );
    const author = list.find((el) => el.link.includes("artist"));
    if (!!author) {
      return await authorService.parseAuthorData(author.title);
    }
    return null;
  };

  initiateTypeRead = async (parentData) => {
    const list = this.selectLinkElementContent(
      selectors({ parentData }).project.type
    );
    const type = list.find((el) =>
      typeList.some((type) => el.title.includes(type))
    );
    const validType = typeList.find((el) => type.title.includes(el));
    if (!!validType) {
      return await typesService.parseTypeData(validType);
    }
    return null;
  };

  initiateLanguageRead = async (parentData) => {
    const list = this.selectLinkElementContent(
      selectors({ parentData }).project.language
    );
    const languageItem = list.find((el) => el.link.includes("index"));
    if (!!languageItem) {
      const language = {
        name: languageItem.title,
        abbr: languageItem.link.split("-")[1].replace(".html", ""),
      };
      return await languageService.parseLanguageData(language);
    }
    return null;
  };

  initiate = async (parentData) => {
    const promises = [
      await this.initiateSeriesRead(parentData),
      await this.initiateAuthorRead(parentData),
      await this.initiateLanguageRead(parentData),
      await this.initiateTypeRead(parentData),
    ];
    const data = await Promise.all(promises);
    return {
      seriesId: data[0],
      authorId: data[1],
      languageId: data[2],
      typeId: data[3],
      parentData,
    };
  };
}

const buildProjectDepsService = new BuildProjectDepsService();

module.exports = { buildProjectDepsService };
