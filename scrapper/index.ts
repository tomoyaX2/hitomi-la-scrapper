import { sequelize } from "./models";
const express = require("express");
import { scrapperRouter } from "./src/modules/scrapper/routes";
import { authRouter } from "./src/modules/auth/routes";
import { mangaRouter } from "./src/modules/manga/routes";
import { usersRouter } from "./src/modules/users/routes";
import { videosRouter } from "./src/modules/videos/routes";

const app = express();
const port = 8000;

app.use(express.static(__dirname + "/public"));
app.use(express.json({ limit: "50mb" }));
app.use("/scrapper", scrapperRouter);
app.use("/manga", mangaRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/videos", videosRouter);

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
