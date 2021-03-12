import axios from "axios";
import { AnyAction } from "redux";
import { loop, Cmd } from "redux-loop";
import { ApiRoutes } from "../../../enums/apiRoutes";
import { getMangaListFailure, getMangaListSuccess } from "./actions";
import { GET_MANGA_LIST } from "./constants";

type Item = {};

const mainInitialState = {
  data: [] as Item[],
  page: 0,
  total: 0,
  perPage: 20,
};

const getManga = async () => {
  const data = await axios.get(ApiRoutes.manga);
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
    default: {
      return state;
    }
  }
};

export { mainReducer, mainInitialState };
