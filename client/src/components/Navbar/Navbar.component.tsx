import React from "react";
import { useHistory } from "react-router";
import { Routes } from "../../enums/routes";
import { Button } from "../Button/Button";

const NavbarComponent: React.FC = ({ children }) => {
  const history = useHistory();

  const redirectToSignUp = () => {
    console.log("111111");
    history.push(Routes.signUp);
  };
  return (
    <div className="flex flex-column w-full">
      <div className=" flex w-full bg-black h-16 absolute justify-end items-center">
        <Button label="Login" />
        <Button label="Sign Up" onClick={redirectToSignUp} />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default NavbarComponent;
