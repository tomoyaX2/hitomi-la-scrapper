import { Album } from "../../../../models";
import uuid from "uuid";
class AlbumService {
  constructor(public scrapperDbService) {}
  initiateAlbumCreation = async (name) => {
    const id = uuid.v4();
    const albumData = {
      id,
      name: name,
    };

    return await this.pushAlbum(albumData);
  };

  pushAlbum = async (albumData) => {
    const result = await this.scrapperDbService.pushProjectData(
      Album,
      albumData
    );
    return result.id;
  };
}

export { AlbumService };
