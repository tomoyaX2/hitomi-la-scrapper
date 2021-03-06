import { Album } from "../../../../../models";

class AlbumService {
  constructor(public scrapperDbService) {}
  initiateAlbumCreation = async (name) => {
    const albumData = {
      name,
    };

    return await this.pushAlbum(albumData);
  };

  pushAlbum = async (albumData) => {
    const result = await this.scrapperDbService.pushMangaData(Album, albumData);
    return result.id;
  };
}

export { AlbumService };
