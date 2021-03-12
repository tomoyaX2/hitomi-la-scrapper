import axios from "axios";
import { loop, Cmd } from "redux-loop";
import { ApiRoutes } from "../../../enums/apiRoutes";
import {
  GET_MANGA_LIST,
  GET_MANGA_LIST_FAILURE,
  GET_MANGA_LIST_SUCCESS,
} from "./constants";

type Item = {};

const mainInitialState = {
  data: [] as Item[],
  page: 0,
  total: 0,
  perPage: 20,
};

const getMangaList = () => {
  return {
    type: GET_MANGA_LIST,
  };
};

const getMangaListSuccess = () => {
  return {
    type: GET_MANGA_LIST_SUCCESS,
  };
};

const getMangaListFailure = () => {
  return {
    type: GET_MANGA_LIST_FAILURE,
  };
};

const getManga = async () => {
  const data = await axios.get(ApiRoutes.manga);
};

const mainReducer = (state = mainInitialState, action: any) => {
  switch (action.type) {
    case GET_MANGA_LIST: {
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

export { getMangaList, mainReducer, mainInitialState };
