import * as Yup from "yup";
import { ProfileSettingsFormData } from "./types";

const profileSettingsValidationSchema = (
  isVisiblePasswordFields: boolean
): Yup.SchemaOf<ProfileSettingsFormData> =>
  Yup.object()
    .shape({
      phone: Yup.string()
        .min(2, "Invalid phone number")
        .max(20, "Invalid phone number")
        .nullable(),
      oldPassword: Yup.string()
        .min(2, "Sorry, but this password is too short")
        .max(50, "Sorry, but this password length is over the limit")
        .test("required", "Required", (value) => {
          return isVisiblePasswordFields ? !!value : true;
        }),
      password: Yup.string()
        .min(2, "Sorry, but this password is too short")
        .max(50, "Sorry, but this password length is over the limit")
        .test("required", "Required", (value) => {
          return isVisiblePasswordFields ? !!value : true;
        }),
      passwordConfirm: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
      email: Yup.string().email("Invalid email"),
      name: Yup.string()
        .min(2, "Sorry, but this name is too short")
        .max(300, "Sorry, but this name length is over the limit"),
    })
    .defined();

export { profileSettingsValidationSchema };
