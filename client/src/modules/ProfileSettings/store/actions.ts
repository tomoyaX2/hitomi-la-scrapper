import { ProfileSettingsDataToSend } from "../types";
import { UPDATE_PROFILE } from "./constants";

const updateProfile = (
  data: ProfileSettingsDataToSend
) => ({
  type: UPDATE_PROFILE.INIT,
  data,
});

const updateProfileSuccess = () => ({
  type: UPDATE_PROFILE.SUCCESS,
});

const updateProfileFailure = () => ({
  type: UPDATE_PROFILE.FAILURE,
});

export { updateProfile, updateProfileSuccess, updateProfileFailure };
