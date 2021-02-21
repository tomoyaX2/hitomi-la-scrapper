const { scrapperDbService } = require("../db/scrapperDb");

class ImagesService {
  saveImage = async (image) => {
    await scrapperDbService.pushImage(image);
    return image;
  };
}

const imagesService = new ImagesService();

module.exports = { imagesService };
