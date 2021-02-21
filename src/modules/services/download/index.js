const fs = require("fs");
const fetch = require("node-fetch");
const dir = "./public/downloads";
const uuid = require("uuid");
const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const axios = require("axios");
const { logService } = require("../log");
const { imagesService } = require("../images");
const { dbService } = require("../db");

class DownloadService {
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
    logService.addToLog(`download initiated by link: ${link}`);
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

  handleImagesList = async (list, albumData) => {
    logService.addToLog(`handle images list start`);
    const downloadImagesIds = [];
    this.createDefaultDir(albumData.id);
    for (let image of list) {
      const id = uuid.v4();
      const url = await this.initiateDownload({ ...image, id: albumData.id });
      imagesService.saveImage({
        id,
        url,
        remoteUrl: image.link,
        referer: image.referer,
      });
      downloadImagesIds.push(id);
    }
    this.index = 0;
    await dbService.createAlbumImageRelation(albumData.id, downloadImagesIds);
    logService.addToLog(`finished`);
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

const downloadService = new DownloadService();

module.exports = { downloadService };
