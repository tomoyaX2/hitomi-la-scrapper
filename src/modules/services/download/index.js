const fs = require("fs");
const fetch = require("node-fetch");
const dir = "./downloads";
const uuid = require("uuid");
const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const axios = require("axios");

class DownloadService {
  index = 0;
  createDefaultDir = (id) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.mkdirSync(`${dir}/${id}`);
    // fs.mkdirSync(`${dir}/compressed/${id}/`, {recursive: true});
    // fs.mkdirSync(`${dir}/decompressed/${id}/`, {recursive: true});
  };

  initiateDownload = async ({ link, referer, id }) => {
    const response = await axios.get(link, {
      headers: {
        referer,
      },
      responseType: "stream",
    });
    await response.data.pipe(
      fs.createWriteStream(`./${dir}/${id}/${this.index}.jpg`)
    );
    this.index++;
  };

  handleImagesList = async (list) => {
    const id = uuid.v4();
    this.createDefaultDir(id);
    for (let image of list) {
      await this.initiateDownload({ ...image, id });
    }
    this.index = 0;
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
