import axios from "axios";
import { loop, Cmd } from "redux-loop";
import { ApiRoutes } from "../../../enums/apiRoutes";
import {
  GET_PROJECTS_LIST,
  GET_PROJECTS_LIST_FAILURE,
  GET_PROJECTS_LIST_SUCCESS,
} from "./constants";

type Item = {};

const mainInitialState = {
  data: [] as Item[],
  page: 0,
  total: 0,
  perPage: 20,
};

const getProjectsList = () => {
  return {
    type: GET_PROJECTS_LIST,
  };
};

const getProjectsListSuccess = () => {
  return {
    type: GET_PROJECTS_LIST_SUCCESS,
  };
};

const getProjectsListFailure = () => {
  return {
    type: GET_PROJECTS_LIST_FAILURE,
  };
};

const getProjects = async () => {
  console.log("22222");
  const data = await axios.get(ApiRoutes.projects);
  console.log(data, "data");
};

const mainReducer = (state = mainInitialState, action: any) => {
  console.log("reducer");
  switch (action.type) {
    case GET_PROJECTS_LIST: {
      console.log("list");
      return loop(
        { ...state },
        Cmd.run(getProjects, {
          successActionCreator: getProjectsListSuccess,
          failActionCreator: getProjectsListFailure,
          args: [],
        })
      );
    }
    default: {
      return state;
    }
  }
};

export { getProjectsList, mainReducer, mainInitialState };
