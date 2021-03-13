import React from "react";
import { VerificationComponent } from "./Verification.component";
import { Formik } from "formik";
import { verificationFormSchema } from "./validation";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import { useHistory } from "react-router";
import { VerifcationFormData } from "./types";
import { resendVerification, verfication } from "../store/actions";
import { selectAuthState } from "../store/reducer";

const initialValues = {
  code: "",
  token: "",
};

const Verification: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { canResend } = useSelector(selectAuthState);
  const onSubmit = (values: VerifcationFormData) => {
    const token = queryString.parse(history.location.search).token as string;
    dispatch(verfication(values.code, token));
  };

  const resend = () => {
    const token = queryString.parse(history.location.search).token as string;
    dispatch(resendVerification(token));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={verificationFormSchema}
    >
      <VerificationComponent canResend={canResend} resend={resend} />
    </Formik>
  );
};

export { Verification };
