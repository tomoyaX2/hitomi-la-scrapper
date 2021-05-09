import { GET_VIDEO_LIST, GET_SINGLE_VIDEO } from "./constants";

const getVideoList = () => ({
  type: GET_VIDEO_LIST.INIT,
});

const getVideoListSuccess = (data: any[]) => ({
  type: GET_VIDEO_LIST.SUCCESS,
  data,
});

const getVideoListFailure = () => ({
  type: GET_VIDEO_LIST.FAILURE,
});

const getSingleVideo = (data: any) => ({
  type: GET_SINGLE_VIDEO.INIT,
  data,
});

const getSingleVideoSuccess = () => ({
  type: GET_SINGLE_VIDEO.SUCCESS,
});

const getSingleVideoFailure = () => ({
  type: GET_SINGLE_VIDEO.FAILURE,
});

export {
  getVideoList,
  getSingleVideo,
  getSingleVideoSuccess,
  getSingleVideoFailure,
  getVideoListSuccess,
  getVideoListFailure,
};
