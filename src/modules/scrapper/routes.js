const express = require("express");
const router = express.Router();
const { initiateScrapper } = require("./");
const { selectElementService } = require("./services/selectElement");

router.get("/", (req, res) => {
  res.send("scrapping is started");
  initiateScrapper();
});

router.get("/stop", (req, res) => {
  res.send("scrapping is stopped");
  selectElementService.stopScrapper();
});

module.exports = router;
