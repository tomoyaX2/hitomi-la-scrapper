import React from "react";
import { InputProps } from "./types";
import { useFormikContext } from "formik";
import { LoginFormData, SignUpFormData } from "../../modules/Auth/store/types";

const Input: React.FC<InputProps> = ({ label, name, placeholder = "" }) => {
  const {
    values,
    errors,
    handleChange,
    touched,
    handleBlur,
  } = useFormikContext<LoginFormData & SignUpFormData>();
  return (
    <div className="flex flex-col  my-4 ">
      <span className="text-md pb-2">{label}</span>
      <input
        name={name}
        value={values[name]}
        className="w-64 rounded-md px-4 py-2 border-2 w-full"
        onBlur={handleBlur}
        placeholder={placeholder}
        onChange={handleChange}
      />

      {touched[name] && errors[name] && (
        <span className="text-sm text-red-400">{errors[name]}</span>
      )}
    </div>
  );
};

export { Input };
