import React from "react";
import { Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Permissions } from "./enums/permissions";
import { Routes } from "./enums/routes";
import { SignUp } from "./modules/Auth/SignUp/SignUp.container";
import { Verification } from "./modules/Auth/Verification/Verification.container";
import Gallery from "./modules/Gallery/Gallery.container";
import Game from "./modules/Game/Game.container";
import Games from "./modules/Games/Games.container";
import Main from "./modules/Main/Main.container";
import Manga from "./modules/Manga/Manga.container";
import MangaList from "./modules/MangaList/MangaList.container";
import { Me } from "./modules/Users/Me/Me.container";

function Router() {
  return (
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
      <ProtectedRoute path={Routes.signUp} permission={Permissions.canRegister}>
        <SignUp />
      </ProtectedRoute>
      <ProtectedRoute
        path={Routes.verification}
        permission={Permissions.canRegister}
      >
        <Verification />
      </ProtectedRoute>
      <ProtectedRoute path={Routes.me} permission={Permissions.viewCabinet}>
        <Me />
      </ProtectedRoute>
      <Route path={Routes.main}>
        <Main />
      </Route>
    </Switch>
  );
}

export default Router;
