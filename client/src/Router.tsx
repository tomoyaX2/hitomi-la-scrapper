import React from "react";
import { Switch, Route } from "react-router-dom";
import { Modal } from "./components/Modal/Modal.container";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes } from "./enums/routes";
import { SignUp } from "./modules/Auth/SignUp/SignUp.container";
import Gallery from "./modules/Gallery/Gallery.container";
import Game from "./modules/Game/Game.container";
import Games from "./modules/Games/Games.container";
import Main from "./modules/Main/Main.container";
import Manga from "./modules/Manga/Manga.container";
import MangaList from "./modules/MangaList/MangaList.container";

function Router() {
  return (
    <Sidebar>
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
        <Route path={Routes.signUp}>
          <SignUp />
        </Route>
        <Route path={Routes.main}>
          <Main />
        </Route>
      </Switch>
    </Sidebar>
  );
}

export default Router;
