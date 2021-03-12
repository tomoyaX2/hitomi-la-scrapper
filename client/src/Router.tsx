import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes } from "./enums/routes";
import { SignUp } from "./modules/Auth/SignUp/SignUp.container";
import { Verification } from "./modules/Auth/Verification/Verification.container";
import Gallery from "./modules/Gallery/Gallery.container";
import Game from "./modules/Game/Game.container";
import Games from "./modules/Games/Games.container";
import Main from "./modules/Main/Main.container";
import Manga from "./modules/Manga/Manga.container";
import MangaList from "./modules/MangaList/MangaList.container";
import { historyService } from "./utils/services/history";

function Router() {
  const history = useHistory();
  React.useEffect(() => {
    historyService.setupHistory(history);
  }, []);
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
        <Route path={Routes.verification}>
          <Verification />
        </Route>
        <Route path={Routes.main}>
          <Main />
        </Route>
      </Switch>
    </Sidebar>
  );
}

export default Router;
