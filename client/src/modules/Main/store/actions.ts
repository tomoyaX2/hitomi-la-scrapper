import { GET_MANGA_LIST } from "./constants";

const getMangaList = () => {
  return {
    type: GET_MANGA_LIST.INIT,
  };
};

const getMangaListSuccess = () => {
  return {
    type: GET_MANGA_LIST.SUCCESS,
  };
};

const getMangaListFailure = () => {
  return {
    type: GET_MANGA_LIST.FAILURE,
  };
};

export { getMangaList, getMangaListSuccess, getMangaListFailure };
