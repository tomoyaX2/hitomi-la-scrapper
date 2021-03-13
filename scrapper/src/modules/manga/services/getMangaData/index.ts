import { Manga, Album, Image, Tag } from "../../../../../models";

class GetMangaDataService {
  constructor(public paramsService) {}
  getAllManga = async () => {
    const dbData = await Manga.findAll({
      limit: this.paramsService.params.limit,
      offset: this.paramsService.params.offset,
      order: [this.paramsService.params.order],
      include: [
        { model: Album, include: [Image] },
        "user",
        "type",
        "author",
        "language",
        "series",
        Tag,
      ],
    });
    return dbData;
  };

  getManga = async (id) => {
    const dbData = await Manga.findOne({ where: { id }, raw: true });
    return dbData;
  };
}

export { GetMangaDataService };
