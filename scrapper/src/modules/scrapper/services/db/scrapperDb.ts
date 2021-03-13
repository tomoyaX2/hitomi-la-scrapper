import { Tag, Manga, Image } from "../../../../../models";
import { appUrl } from "../../utils/constants";

class ScrapperDbService {
  tags = [];
  currentManga = {};

  pushMangaData = async (Model, data) => {
    const result = await Model.findOrCreate({
      where: { name: data.name },
      defaults: data,
      raw: true,
    });
    return result[0];
  };

  setCurrentManga = (manga) => {
    this.currentManga = manga;
  };

  pushTags = async (tags) => {
    this.tags = [...this.tags, ...tags];
    for (let tag of tags) {
      await Tag.create(tag);
    }
  };

  selectTagsList = async () => {
    const dbData = await Tag.findAll({ raw: true });
    this.tags = dbData;
  };

  filterAlreadyExistedMangas = async (mangas) => {
    const result = [];
    for (let manga of mangas) {
      const dbManga = await Manga.findOne({
        where: {
          name: manga.title,
          scrappedFrom: `${appUrl}${manga.link}`,
        },
      });
      if (!dbManga) {
        result.push(manga);
      }
    }
    return result;
  };

  pushImage = async (image) => {
    return await Image.create(image);
  };

  prepeareServiceToScrap = async () => {
    this.currentManga = {};
    await this.selectTagsList();
  };
}

export { ScrapperDbService };
