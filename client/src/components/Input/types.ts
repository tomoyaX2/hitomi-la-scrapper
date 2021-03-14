import { LoginFormData, SignUpFormData } from "../../modules/Auth/store/types";
import { VerifcationFormData } from "../../modules/Auth/Verification/types";
import { ProfileSettingsFormData } from "../../modules/ProfileSettings/types";

export type InputProps = {
  label?: string;
  name:
    | keyof LoginFormData
    | keyof SignUpFormData
    | keyof VerifcationFormData
    | keyof ProfileSettingsFormData;
  placeholder?: string;
  isRequired?: boolean;
};
