import { UserData } from "../Users/store/types";

export type ProfileSettingsProps = {
  me?: UserData;
  isVisiblePasswordFields: boolean;
  handleChangeVisiblePasswordFieldsState: () => void;
};

export type ProfileSettingsFormData = {
  login: string;
  email: string;
  oldPassword: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  name: string;
};

export type ProfileSettingsDataToSend = Partial<UserData> & {
  isTwoFactorActive?: boolean;
  isPhoneSubmitted?: boolean
};
