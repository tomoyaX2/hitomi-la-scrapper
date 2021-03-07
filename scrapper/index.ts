import { sequelize } from "./src/models";
const express = require("express");
import { scrapperRouter } from "./src/modules/scrapper/routes";
import { authRouter } from "./src/modules/auth/routes";
import { projectsRouter } from "./src/modules/projects/routes";
import { usersRouter } from "./src/modules/users/routes";

const app = express();
const port = 8000;

app.use("/scrapper", scrapperRouter);
app.use("/projects", projectsRouter);
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
