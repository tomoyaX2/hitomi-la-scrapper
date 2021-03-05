const express = require("express");
const { sequelize } = require("./models");

const app = express();
const port = 3000;

app.use("/scrapper", require("./src/modules/scrapper/routes"));
app.use("/projects", require("./src/modules/projects/routes"));
app.use("/users", require("./src/modules/users/routes"));
app.use("/auth", require("./src/modules/auth/routes"));

app.use(express.static(__dirname + "/public"));

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
