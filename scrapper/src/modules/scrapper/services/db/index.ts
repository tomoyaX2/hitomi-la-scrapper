import {
  Album,
  AlbumImage,
  Image,
  Manga,
  MangaTag,
  Tag,
} from "../../../../models";

class DbService {
  createMangaTagRelation = async (MangaId, tagIds) => {
    const data = await Manga.findOne({
      where: { id: MangaId },
      include: Tag,
    });
    const existedTags = !!data ? data.Tags.map((el) => el.id) : [];

    for (let TagId of tagIds) {
      const isAlreadyAssign = existedTags.some((el) => el === TagId);
      if (!isAlreadyAssign) {
        await MangaTag.create({ MangaId, TagId } as any);
      }
    }
  };

  createAlbumImageRelation = async (AlbumId, imageIds) => {
    const data = await Album.findOne({
      where: { id: AlbumId },
      include: Image,
    });
    const existedTags = !!data ? data.Images.map((el) => el.id) : [];

    for (let ImageId of imageIds) {
      const isAlreadyAssign = existedTags.some((el) => el === ImageId);
      if (!isAlreadyAssign) {
        await AlbumImage.create({ AlbumId, ImageId } as any);
      }
    }
  };
}

export { DbService };
