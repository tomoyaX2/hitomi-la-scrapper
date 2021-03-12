import { useFormikContext } from "formik";
import React from "react";
import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";

const SignUpComponent: React.FC = () => {
  const { handleSubmit } = useFormikContext();
  return (
    <div className="flex flex-col w-64">
      <Input name="login" label="Login" />
      <Input name="name" label="Name" />
      <Input name="email" label="Email" />
      <Input name="password" label="Password" />
      <Input name="passwordConfirm" label="Password Confirmation" />
      <div className="flex justify-end">
        <Button label={"Sign Up"} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export { SignUpComponent };
