const uuid = require("uuid");
const { scrapperDbService } = require("../db/scrapperDb");
const { Album } = require("../../../../../models");

class AlbumService {
  initiateAlbumCreation = async (name) => {
    const id = uuid.v4();
    const albumData = {
      id,
      name: name,
    };

    return await this.pushAlbum(albumData);
  };

  pushAlbum = async (albumData) => {
    const result = await scrapperDbService.pushProjectData(Album, albumData);
    return result.id;
  };
}

const albumService = new AlbumService();

module.exports = { albumService };