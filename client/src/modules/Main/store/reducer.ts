import axios from "axios";
import { AnyAction } from "redux";
import { loop, Cmd } from "redux-loop";
import { State } from "../../../config/createStore";
import { ApiRoutes } from "../../../enums/apiRoutes";
import { getMangaListFailure, getMangaListSuccess } from "./actions";
import { GET_MANGA_LIST } from "./constants";
import { Recomendations } from "./types";

const mainInitialState = {
  recomendations: { manga: [] } as Recomendations,
  page: 0,
  total: 0,
  perPage: 20,
};

const selectRecomendations = (state: State) => state.main.recomendations;

const getManga = async () => {
  const data = await axios.get(ApiRoutes.manga);
  console.log(data, "data");
  return data.data;
};

const mainReducer = (state = mainInitialState, action: AnyAction) => {
  switch (action.type) {
    case GET_MANGA_LIST.INIT: {
      return loop(
        { ...state },
        Cmd.run(getManga, {
          successActionCreator: getMangaListSuccess,
          failActionCreator: getMangaListFailure,
          args: [],
        })
      );
    }
    case GET_MANGA_LIST.SUCCESS: {
      return {
        ...state,
        recomendations: { ...state.recomendations, manga: action.data },
      };
    }
    default: {
      return state;
    }
  }
};

export { mainReducer, mainInitialState, selectRecomendations };
