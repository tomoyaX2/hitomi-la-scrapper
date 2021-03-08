import React from "react";
import { Switch, Route } from "react-router-dom";
import { Routes } from "./enums/routes";
import Gallery from "./modules/Gallery/Gallery.container";
import Game from "./modules/Game/Game.container";
import Games from "./modules/Games/Games.container";
import Main from "./modules/Main/Main.container";
import Project from "./modules/Project/Project.container";

function Router() {
  return (
    <Switch>
      <Route path={Routes.main} exact>
        <Main />
      </Route>
      <Route path={Routes.project}>
        <Project />
      </Route>
      <Route path={Routes.gallery}>
        <Gallery />
      </Route>
      <Route path={Routes.games}>
        <Games />
      </Route>
      <Route path={Routes.game}>
        <Game />
      </Route>
    </Switch>
  );
}

export default Router;
