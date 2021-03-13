import { useFormikContext } from "formik";
import React from "react";
import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";

const LoginComponent: React.FC = () => {
  const { handleSubmit } = useFormikContext();
  return (
    <div className="flex flex-col w-64 px-4 py-2">
      <Input name="login" label="Login" />
      <Input name="password" label="Password" />
      <div className="flex justify-end">
        <Button label={"Login"} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export { LoginComponent };
