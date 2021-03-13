import { GET_ME } from "./constants";

const getMe = () => ({
  type: GET_ME.INIT,
});

const getMeSuccess = () => ({
  type: GET_ME.SUCCESS,
});

const getMeFailure = () => ({
  type: GET_ME.FAILURE,
});

export { getMe, getMeSuccess, getMeFailure };
