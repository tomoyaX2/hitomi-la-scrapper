import * as Yup from "yup";
import { LoginFormData } from "../store/types";

const loginValidationScema: Yup.SchemaOf<LoginFormData> = Yup.object()
  .shape({
    login: Yup.string()
      .required("Name is required")
      .max(300, "Sorry, but this password length is over the limit"),
    password: Yup.string()
      .max(50, "Sorry, but this password length is over the limit")
      .required("Required"),
  })
  .defined();

export { loginValidationScema };
