import cherio from "cheerio";
import { Manga } from "../../../../../models";
import { selectors } from "../../utils/selectors";

class MangaService {
  constructor(public albumService, public scrapperDbService) {}
  selectMangaContent = async ({
    parentData,
    seriesId,
    authorId,
    languageId,
    typeId,
    link,
  }) => {
    const $ = cherio.load(parentData);
    const titles = [];
    $(selectors().manga.title).each((i, element) => {
      titles.push($(element).text());
    });
    const albumId = await this.albumService.initiateAlbumCreation(titles[0]);
    const manga = {
      name: titles[0],
      author_id: authorId,
      series_id: seriesId,
      language_id: languageId,
      type_id: typeId,
      album_id: albumId,
      scrappedFrom: link,
    };
    this.scrapperDbService.setCurrentManga(manga);
    return await this.pushData(manga);
  };

  pushData = async (manga) => {
    const result = await this.scrapperDbService.pushMangaData(Manga, manga);
    return result.id;
  };
}

export { MangaService };
