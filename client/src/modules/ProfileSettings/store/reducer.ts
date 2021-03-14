import axios from "axios";
import { AnyAction } from "redux";
import { Cmd, loop } from "redux-loop";
import { ApiRoutes } from "../../../enums/apiRoutes";
import { NotificationTypes } from "../../../enums/notificationTypes";
import { notificationService } from "../../../utils/services/notification";
import { ProfileSettingsDataToSend } from "../types";
import { updateProfileFailure, updateProfileSuccess } from "./actions";
import { UPDATE_PROFILE } from "./constants";

const profileSettingsState = {};

const initProfileUpdate = async (data: ProfileSettingsDataToSend) => {
  try {
    await axios.post(ApiRoutes.updateProfile, data);
    notificationService.notify({
      title: "Success",
      description: "Profile has been updated successfully",
    });
  } catch (e) {
    notificationService.notify({
      title: "Error",
      type: NotificationTypes.error,
      description: JSON.stringify(e.response.data.errors),
    });
  }
};

const profileSettingsReducer = (
  state = profileSettingsState,
  action: AnyAction
) => {
  switch (action.type) {
    case UPDATE_PROFILE.INIT: {
      return loop(
        { ...state },
        Cmd.run(initProfileUpdate, {
          successActionCreator: updateProfileSuccess,
          failActionCreator: updateProfileFailure,
          args: [action.data],
        })
      );
    }
    default:
      return state;
  }
};

export { profileSettingsReducer, profileSettingsState };
