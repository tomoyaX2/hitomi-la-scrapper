import { LoginFormData, SignUpFormData } from "../../modules/Auth/store/types";

export type InputProps = {
  label?: string;
  name: keyof LoginFormData | keyof SignUpFormData;
  placeholder?: string;
};
