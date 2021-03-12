import { sequelize } from "./src/models";
const express = require("express");
import { scrapperRouter } from "./src/modules/scrapper/routes";
import { authRouter } from "./src/modules/auth/routes";
import { mangaRouter } from "./src/modules/manga/routes";
import { usersRouter } from "./src/modules/users/routes";
import bodyParser from "body-parser";

const app = express();
const port = 8000;

app.use(express.json());
app.use("/scrapper", scrapperRouter);
app.use("/manga", mangaRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

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
