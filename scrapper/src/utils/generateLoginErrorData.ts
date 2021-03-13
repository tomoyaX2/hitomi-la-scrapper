import { UserErrors } from "../modules/auth/types";

export const generateLoginErrorData = ({ isExistsEmail, isExistsLogin }) => {
  let errors = {} as UserErrors;
  let isValid = true;
  if (isExistsEmail) {
    isValid = false;
    errors = { ...errors, email: "This email is already taken" };
  }
  if (isExistsLogin) {
    isValid = false;
    errors = { ...errors, login: "This login is already taken" };
  }
  if (isValid) {
    return { errors: null, isSuccess: true };
  }
  return { isSuccess: false, errors };
};
