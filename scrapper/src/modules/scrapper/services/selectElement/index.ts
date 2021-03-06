import cherio from "cheerio";
import Nightmare from "nightmare";
const nightmare = Nightmare({ show: true });
import { appUrl } from "../../utils/constants";
import { selectors } from "../../utils/selectors";

class SelectElementService {
  constructor(
    public tagsService,
    public buildMangaDepsService,
    public mangaService,
    public logService
  ) {}
  stopScrapper = async () => {
    await nightmare.end();
  };

  readPageBody = async (url) => {
    try {
      const parentData = await nightmare
        .goto(url)
        .wait("body")
        .evaluate(() => document.querySelector("body").innerHTML);
      return parentData;
    } catch (e) {
      this.logService.writeLog();
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

  initiateTagsRead = async (parentData, mangaId) => {
    const tagsContent = this.selectLinkElementContent(
      selectors({ parentData }).tags as any
    );
    return await this.tagsService.parseTagsData(tagsContent, mangaId);
  };

  selectPageContent = async ({
    link,
    hasToScrapMangaData = false,
    ...data
  }) => {
    const parentData = await this.readPageBody(link);
    if (!parentData) {
      return null;
    }
    const content = await this.selectLinkElementContent({
      ...data,
      parentData,
    } as any);
    1;
    if (hasToScrapMangaData) {
      const mangaDeps = await this.buildMangaDepsService.initiate(parentData);
      const mangaId = await this.mangaService.selectMangaContent({
        ...mangaDeps,
        link,
      });
      await this.initiateTagsRead(parentData, mangaId);
    }
    return { content };
  };

  selectPageDataForDownload = async (album) => {
    const result = [];
    for (let el of album) {
      const { content } = await this.selectPageContent(
        selectors({ ...el, link: `${appUrl}${el.link}` }).galleryPages as any
      );
      result.push(content);
    }
    return result;
  };
}

export { SelectElementService };
