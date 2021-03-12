import { LoginFormData, SignUpFormData } from "../../modules/Auth/store/types";
import { VeririfcationFormProps } from "../../modules/Auth/Verification/types";

export type InputProps = {
  label?: string;
  name:
    | keyof LoginFormData
    | keyof SignUpFormData
    | keyof VeririfcationFormProps;
  placeholder?: string;
};
