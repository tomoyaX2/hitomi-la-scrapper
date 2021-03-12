import React from "react";
import { Switch, Route } from "react-router-dom";
import { Routes } from "./enums/routes";
import Gallery from "./modules/Gallery/Gallery.container";
import Game from "./modules/Game/Game.container";
import Games from "./modules/Games/Games.container";
import Main from "./modules/Main/Main.container";
import Navbar from "./modules/Navbar/Navbar";
import Manga from "./modules/Manga/Manga.container";
import MangaList from "./modules/MangaList/MangaList.container";

function Router() {
  return (
    <Navbar>
      <Switch>
        <Route path={Routes.gallery}>
          <Gallery />
        </Route>
        <Route path={Routes.manga}>
          <Manga />
        </Route>
        <Route path={Routes.game}>
          <Game />
        </Route>
        <Route path={Routes.games}>
          <Games />
        </Route>
        <Route path={Routes.mangaList}>
          <MangaList />
        </Route>
        <Route path={Routes.main} exact>
          <Main />
        </Route>
      </Switch>
    </Navbar>
  );
}

export default Router;
