import fs from "fs";
const dir = "./public/downloads";
import crypto from "crypto";
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
    const albumId = this.scrapperDbService.currentManga.album_id;
    this.logService.addToLog(`handle images list start`);
    const downloadImagesIds = [];
    this.createDefaultDir(albumId);
    for (let image of list) {
      const id = crypto.randomBytes(16).toString("hex");
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
  };

  clearDownloads = () => {
    fs.rmdirSync(dir, { recursive: true });
  };
}

export { DownloadService };
