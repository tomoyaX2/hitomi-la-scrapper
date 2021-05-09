import axios from "axios";
import { AnyAction } from "redux";
import { Cmd, loop } from "redux-loop";
import { State } from "../../../config/createStore";
import { ApiRoutes } from "../../../enums/apiRoutes";
import { NotificationTypes } from "../../../enums/notificationTypes";
import { notificationService } from "../../../utils/services/notification";
import {
  getVideoListSuccess,
  getVideoListFailure,
  getSingleVideoSuccess,
  getSingleVideoFailure,
} from "./actions";
import { GET_VIDEO_LIST, GET_SINGLE_VIDEO } from "./constants";

const selectVideosList = (state: State) => state.videos.list;
const selectSingleVideo = (state: State) => state.videos.single;

const videosState = {
  list: [],
  single: {},
  isLoaded: false,
};

const handleGetVideoList = async () => {
  try {
    const data = await axios.get(ApiRoutes.videos);
    return data?.data?.data;
  } catch (e) {
    notificationService.notify({
      title: "Error",
      type: NotificationTypes.error,
      description: "Cannot get user",
    });
  }
};

const handleGetSingleVideo = async (id: string) => {
  try {
    const data = await axios.get(`${ApiRoutes.videos}/${id}`);
    return data?.data?.data;
  } catch (e) {
    notificationService.notify({
      title: "Error",
      type: NotificationTypes.error,
      description: "Cannot get user",
    });
  }
};

const videosReducer = (state = videosState, action: AnyAction) => {
  switch (action.type) {
    case GET_VIDEO_LIST.INIT: {
      return loop(
        { ...state },
        Cmd.run(handleGetVideoList, {
          successActionCreator: getVideoListSuccess,
          failActionCreator: getVideoListFailure,
          args: [],
        })
      );
    }
    case GET_VIDEO_LIST.SUCCESS: {
      console.log(action, "actions");
      return {
        ...state,
        list: action.data,
      };
    }
    case GET_SINGLE_VIDEO.INIT: {
      return loop(
        { ...state },
        Cmd.run(handleGetSingleVideo, {
          successActionCreator: getSingleVideoSuccess,
          failActionCreator: getSingleVideoFailure,
          args: [action.id],
        })
      );
    }
    case GET_SINGLE_VIDEO.SUCCESS: {
      return {
        ...state,
        single: action.data.data,
      };
    }
    default:
      return state;
  }
};

export { videosState, videosReducer, selectVideosList, selectSingleVideo };
