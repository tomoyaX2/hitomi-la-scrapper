import React from "react";
import { VerificationComponent } from "./Verification.component";
import { Formik } from "formik";
import { verificationFormSchema } from "./validation";
import { useDispatch } from "react-redux";
import queryString from "query-string";
import { useHistory } from "react-router";
import { VeririfcationFormProps } from "./types";
import { verfication } from "../store/actions";

const initialValues = {
  code: "",
};

const Verification: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (values: VeririfcationFormProps) => {
    const userId = queryString.parse(history.location.search).userId as string;
    dispatch(verfication(values.code, userId));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={verificationFormSchema}
    >
      <VerificationComponent />
    </Formik>
  );
};

export { Verification };
