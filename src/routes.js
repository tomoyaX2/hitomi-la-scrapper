const express = require("express");
const router = express.Router();
const scrapper = require("../src/modules/scrapper");

router.get("/", (req, res) => {
  res.send("scrapping is started");
  scrapper.initiateScrapper();
});

module.exports = router;
