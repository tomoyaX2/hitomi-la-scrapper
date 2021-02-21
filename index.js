const express = require("express");
const { sequelize } = require("./models");

const app = express();
const port = 3000;

app.use("/scrapper", require("./src/routes"));
app.use(express.static(__dirname+'/public'));

app.get("/", (req, res) => {
  res.sendStatus(200);
});
sequelize.sync().then(() => {
  app.listen(port, (err) => {
    if (err) {
      return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
  });
});
