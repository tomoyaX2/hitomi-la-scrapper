const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log(`users requested`);
  res.send("users requested");
});

router.get("/:id", async (req, res) => {
  console.log(`user requested with id: ${req.params.id}`);
  res.send("user requested");
});

module.exports = router;
