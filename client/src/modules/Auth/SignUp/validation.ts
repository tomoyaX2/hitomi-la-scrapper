import * as Yup from "yup";
import { SignUpFormData } from "../store/types";

const signUpValidationScema: Yup.SchemaOf<SignUpFormData> = Yup.object()
  .shape({
    login: Yup.string()
      .min(2, "Sorry, but this name is too short")
      .max(300, "Sorry, but this name length is over the limit")
      .required("Name is required"),
    name: Yup.string()
      .min(2, "Sorry, but this name is too short")
      .max(300, "Sorry, but this name length is over the limit")
      .required("Name is required"),
    password: Yup.string()
      .min(2, "Sorry, but this password is too short")
      .max(50, "Sorry, but this password length is over the limit")
      .required("Required"),
    passwordConfirm: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    email: Yup.string().email("Invalid email").required("Required"),
  })
  .defined();

export { signUpValidationScema };
