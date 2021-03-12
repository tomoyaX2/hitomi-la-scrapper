import React from "react";
import { ButtonProps } from "./types";

const borderedStyle =
  "border-button border-2 text-white mx-4 h-10 rounded-md px-4";
const defaultStyle = "bg-button text-white h-10 rounded-md px-4 w-32";
const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  label,
  className = defaultStyle,
  disabledClassName = "h-8 bg-button-disabled text-white rounded-md  mx-4",
  bordered = false,
}) => {
  return (
    <button
      className={
        disabled ? disabledClassName : bordered ? borderedStyle : className
      }
      onClick={!disabled ? onClick : () => {}}
    >
      {label}
    </button>
  );
};

export { Button };
