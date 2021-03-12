import React from "react";
import { useHistory } from "react-router";
import { Routes } from "../../enums/routes";
import { Button } from "../Button/Button";

const NavbarComponent: React.FC = ({ children }) => {
  const history = useHistory();

  const redirectToSignUp = () => {
    history.push(Routes.signUp);
  };
  return (
    <div className="flex flex-column w-full">
      <div className=" flex w-full bg-black h-17 absolute justify-end items-center shadow-lg">
        <Button label="Login" bordered />
        <Button label="Sign Up" bordered onClick={redirectToSignUp} />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default NavbarComponent;
