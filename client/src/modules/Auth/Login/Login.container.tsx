import { Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/actions";
import { LoginFormData } from "../store/types";
import { LoginComponent } from "./Login.component";
import { loginValidationScema } from "./validation";

const initialValues = { login: "", password: "" };

const Login: React.FC<{ handleChangeLoginModalState: () => void }> = ({
  handleChangeLoginModalState,
}) => {
  const dispatch = useDispatch();
  const onSubmit = (values: LoginFormData) => {
    dispatch(login(values));
    handleChangeLoginModalState();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={loginValidationScema}
    >
      <LoginComponent />
    </Formik>
  );
};

export { Login };
