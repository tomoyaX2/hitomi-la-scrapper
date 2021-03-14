import { Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "rsuite";
import { getMe } from "../Users/store/actions";
import { selectMe } from "../Users/store/reducer";
import ProfileSettingsComponent from "./ProfileSettings.component";
import { updateProfile } from "./store/actions";
import { ProfileSettingsDataToSend } from "./types";
import { profileSettingsValidationSchema } from "./validation";

const ProfileSettings: React.FC = () => {
  const me = useSelector(selectMe);
  const [isVisiblePasswordFields, setVisiblePasswordFields] = React.useState(
    false
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getMe());
  }, []);

  const onSubmit = (values: ProfileSettingsDataToSend) => {
    dispatch(updateProfile(values));
  };

  const handleChangeVisiblePasswordFieldsState = () => {
    setVisiblePasswordFields(!isVisiblePasswordFields);
  };

  if (!me.id) {
    return <Loader />;
  }

  return (
    <Formik
      initialValues={{
        ...me,
        password: "",
        passwordConfirm: "",
        oldPassword: "",
      }}
      onSubmit={onSubmit}
      validationSchema={profileSettingsValidationSchema(
        isVisiblePasswordFields
      )}
    >
      <ProfileSettingsComponent
        isVisiblePasswordFields={isVisiblePasswordFields}
        handleChangeVisiblePasswordFieldsState={
          handleChangeVisiblePasswordFieldsState
        }
      />
    </Formik>
  );
};

export default ProfileSettings;
