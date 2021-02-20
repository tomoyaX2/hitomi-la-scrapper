const express = require("express");
const scrapper = require("./src/modules/scrapper/index.js");

const app = express();
const port = 3000;
const router = express.Router();

app.get("/", (req, res) => {});

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  scrapper.initiateScrapper();
  return console.log(`server is listening on ${port}`);
});
