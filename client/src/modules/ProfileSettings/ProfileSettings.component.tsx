import { useFormikContext } from "formik";
import React from "react";
import { Button } from "../../components/Button/Button";
import { ImageUpload } from "../../components/ImageUpload/ImageUpload";
import { Input } from "../../components/Input/Input";
import { Switch } from "../../components/Switch/Switch";
import { ProfileSettingsDataToSend, ProfileSettingsProps } from "./types";

const ProfileSettingsComponent: React.FC<ProfileSettingsProps> = ({
  isVisiblePasswordFields,
  handleChangeVisiblePasswordFieldsState,
}) => {
  const {
    handleSubmit,
    setFieldValue,
    values,
  } = useFormikContext<ProfileSettingsDataToSend>();

  React.useEffect(() => {
    if (!isVisiblePasswordFields) {
      setFieldValue("password", "");
      setFieldValue("oldPassword", "");
      setFieldValue("passwordConfirm", "");
    }
  }, [isVisiblePasswordFields]);

  return (
    <div className="flex">
      <div className="flex flex-col w-64">
        <Input name="login" label="Login" />
        <Input name="name" label="Name" />
        <Input name="email" label="Email" />
        <Input name="phone" label="Phone" />
        <Switch
          label="Two factor Auth"
          disabled={!values.isPhoneSubmitted}
          name="isTwoFactorActive"
        />
        {isVisiblePasswordFields ? (
          <>
            <Input name="oldPassword" isRequired label="Old password" />
            <Input name="password" label="Password" />
            <Input name="passwordConfirm" label="Password Confirmation" />
          </>
        ) : (
          <span
            className="cursor-pointer text-black underline text-lg mt-4"
            onClick={handleChangeVisiblePasswordFieldsState}
          >
            Change password
          </span>
        )}
        <div
          className={`flex ${
            isVisiblePasswordFields ? "justify-between" : "justify-end"
          }  mt-4`}
        >
          {isVisiblePasswordFields && (
            <Button
              label={"Cancel"}
              className="bg-button text-white h-10 rounded-md px-4 w-24"
              onClick={handleChangeVisiblePasswordFieldsState}
            />
          )}
          <Button label={"Save changes"} onClick={handleSubmit} />
        </div>
      </div>
      <ImageUpload name="avatarUrl" />
    </div>
  );
};

export default ProfileSettingsComponent;
