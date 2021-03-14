import { Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMe } from "../../Users/store/reducer";
import { login, twoFactorLogin } from "../store/actions";
import { selectAuthState } from "../store/reducer";
import { TwoFactorLoginData } from "../store/types";
import { LoginComponent } from "./Login.component";
import { loginValidationScema } from "./validation";

const initialValues = { login: "", password: "", code: "" };

const Login: React.FC<{ handleChangeLoginModalState: () => void }> = ({
  handleChangeLoginModalState,
}) => {
  const dispatch = useDispatch();
  const me = useSelector(selectMe);
  const { visibleTwoFactor } = useSelector(selectAuthState);
  
  const onSubmit = (values: TwoFactorLoginData) => {
    const targetAction = visibleTwoFactor ? twoFactorLogin : login;
    dispatch(targetAction(values));
  };

  React.useEffect(() => {
    if (!!me.id) {
      handleChangeLoginModalState();
    }
  }, [me.id]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={loginValidationScema}
    >
      <LoginComponent visibleTwoFactor={visibleTwoFactor} />
    </Formik>
  );
};

export { Login };
