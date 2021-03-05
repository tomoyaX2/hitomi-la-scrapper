class ImagesService {
  constructor(public scrapperDbService) {}
  saveImage = async (image) => {
    await this.scrapperDbService.pushImage(image);
    return image;
  };
}

export { ImagesService };
