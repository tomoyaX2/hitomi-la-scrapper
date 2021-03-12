import React from "react";
import { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  label,
  className = "bg-button text-white mx-4 h-8 rounded-md px-4",
  disabledClassName = " h-8 bg-button-disabled text-white rounded-md  mx-4 px-4",
}) => {
  return (
    <button
      className={disabled ? disabledClassName : className}
      onClick={!disabled ? onClick : () => {}}
    >
      {label}
    </button>
  );
};

export { Button };
