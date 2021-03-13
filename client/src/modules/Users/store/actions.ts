import { GET_ME, LOGOUT } from "./constants";
import { UserData } from "./types";

const logout = () => ({
  type: LOGOUT.INIT,
});

const logoutSuccess = () => ({
  type: LOGOUT.SUCCESS,
});

const getMe = () => ({
  type: GET_ME.INIT,
});

const getMeSuccess = (data: UserData) => ({
  type: GET_ME.SUCCESS,
  data,
});

const getMeFailure = () => ({
  type: GET_ME.FAILURE,
});

export { getMe, getMeSuccess, getMeFailure, logout, logoutSuccess };
