import { useFormikContext } from "formik";
import React from "react";
import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { VerificationComponentProps } from "./types";

const VerificationComponent: React.FC<VerificationComponentProps> = ({
  canResend,
  resend,
}) => {
  const { handleSubmit } = useFormikContext();

  return (
    <div className="flex flex-col">
      <Input name="code" label="Code" />
      <div className="flex justify-between">
        {canResend && (
          <Button
            label={"Resend"}
            onClick={resend}
            className="bg-button text-white  h-8 rounded-md px-4 w-32 mt-4"
          />
        )}
        <Button
          label={"Submit"}
          onClick={handleSubmit}
          className="bg-button text-white  h-8 rounded-md px-4 w-32 mt-4"
        />
      </div>
    </div>
  );
};

export { VerificationComponent };
