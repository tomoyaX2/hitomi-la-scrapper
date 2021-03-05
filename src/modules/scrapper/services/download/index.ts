import fs from "fs";
const dir = "./public/downloads";
import uuid from "uuid";
import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import axios from "axios";

class DownloadService {
  constructor(
    public scrapperDbService,
    public dbService,
    public imagesService,
    public logService
  ) {}
  index = 0;
  createDefaultDir = (id) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.mkdirSync(`${dir}/${id}`);
    // fs.mkdirSync(`${dir}/compressed/${id}/`, {recursive: true});
    // fs.mkdirSync(`${dir}/decompressed/${id}/`, {recursive: true});
  };

  initiateDownload = async ({ link, referer, id }) => {
    this.logService.addToLog(`download initiated by link: ${link}`);
    const response = await axios.get(link, {
      headers: {
        referer,
      },
      responseType: "stream",
    });
    const path = `${dir}/${id}/${this.index}.jpg`;
    await response.data.pipe(fs.createWriteStream(path));
    this.index++;
    return path;
  };

  handleImagesList = async (list) => {
    const albumId = this.scrapperDbService.currentProject.album_id;
    this.logService.addToLog(`handle images list start`);
    const downloadImagesIds = [];
    this.createDefaultDir(albumId);
    for (let image of list) {
      const id = uuid.v4();
      const url = await this.initiateDownload({ ...image, id: albumId });
      this.imagesService.saveImage({
        id,
        url,
        remoteUrl: image.link,
        referer: image.referer,
      });
      downloadImagesIds.push(id);
    }
    this.index = 0;
    await this.dbService.createAlbumImageRelation(albumId, downloadImagesIds);
    this.logService.addToLog(`finished`);
    console.log("finished");
    // await this.compressImages(id);
    // await this.decompressImages(id);
  };

  decompressImages = async (id) => {
    try {
      await imagemin([`downloads/compressed/${id}/*.jpg`], {
        destination: `downloads/decompressed/${id}`,
        plugins: [imageminMozjpeg({ quality: 100, revert: true })],
      });
    } catch (e) {}
  };

  compressImages = async (id) => {
    try {
      await imagemin([`downloads/${id}/*.jpg`], {
        destination: `downloads/compressed/${id}`,
        plugins: [imageminMozjpeg({ quality: 50 })],
      });
    } catch (e) {}
  };

  clearDownloads = () => {
    fs.rmdirSync(dir, { recursive: true });
  };
}

export { DownloadService };
