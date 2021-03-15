import { GET_MANGA_LIST } from "./constants";
import { Manga } from "./types";

const getMangaList = () => {
  return {
    type: GET_MANGA_LIST.INIT,
  };
};

const getMangaListSuccess = (data: Manga[]) => {
  return {
    type: GET_MANGA_LIST.SUCCESS,
    data,
  };
};

const getMangaListFailure = () => {
  return {
    type: GET_MANGA_LIST.FAILURE,
  };
};

export { getMangaList, getMangaListSuccess, getMangaListFailure };
