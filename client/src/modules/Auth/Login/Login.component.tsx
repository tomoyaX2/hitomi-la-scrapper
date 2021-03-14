import { useFormikContext } from "formik";
import React from "react";
import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { LoginProps } from "./types";

const LoginComponent: React.FC<LoginProps> = ({ visibleTwoFactor }) => {
  const { handleSubmit, setSubmitting } = useFormikContext();
  const [codeFieldVisible, setCodeFieldVisible] = React.useState(false);

  React.useEffect(() => {
    setCodeFieldVisible(visibleTwoFactor);
    setSubmitting(false);
  }, [visibleTwoFactor]);

  return (
    <div className="flex flex-col w-64 px-4 py-2">
      {codeFieldVisible ? (
        <Input name="code" label="Code" />
      ) : (
        <>
          <Input name="login" label="Login" />
          <Input name="password" label="Password" />
        </>
      )}
      <div className="flex justify-end">
        <Button label="Login" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export { LoginComponent };
