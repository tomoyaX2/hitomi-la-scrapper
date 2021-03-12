import { Formik, FormikHelpers, FormikProps } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../store/actions";
import { SignUpFormData } from "../store/types";
import { SignUpComponent } from "./SignUp.component";
import { signUpValidationScema } from "./validation";

const initialValues = {
  login: "",
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const onSubmit = (
    values: SignUpFormData,
    actions: FormikHelpers<SignUpFormData>
  ) => {
    dispatch(signUp(values));
    actions.setSubmitting(false);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={signUpValidationScema}
    >
      <SignUpComponent />
    </Formik>
  );
};

export { SignUp };
