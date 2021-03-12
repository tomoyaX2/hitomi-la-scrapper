import { useFormikContext } from "formik";
import React from "react";
import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";

const SignUpComponent: React.FC = () => {
  const { handleSubmit } = useFormikContext();
  return (
    <div className="flex flex-col">
      <Input name="name" label="Name" />
      <Input name="email" label="Email" />
      <Input name="password" label="Password" />
      <Input name="passwordConfirm" label="Password Confirmation" />
      <div className="flex justify-end">
        <Button
          label={"Sign Up"}
          onClick={handleSubmit}
          className="bg-button text-white  h-8 rounded-md px-4 w-32 mt-4"
        />
      </div>
    </div>
  );
};

export { SignUpComponent };
