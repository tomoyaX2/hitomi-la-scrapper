const uuid = require("uuid");
const { scrapperDbService } = require("../db/scrapperDb");

class AlbumService {
  initiateAlbumCreation = () => {
    const id = uuid.v4();
    const albumData = {
      id,
      name: scrapperDbService.currentProject.title,
      project_id: scrapperDbService.currentProject.id,
    };

    return this.verifyExistedAlbum(albumData);
  };

  verifyExistedAlbum = (albumData) => {
    const existed = scrapperDbService.albums.find(
      (el) => el.title === albumData.name
    );
    if (!existed) {
      scrapperDbService.pushAlbum(albumData);
      return albumData;
    }
    return existed;
  };
}

const albumService = new AlbumService();

module.exports = { albumService };
