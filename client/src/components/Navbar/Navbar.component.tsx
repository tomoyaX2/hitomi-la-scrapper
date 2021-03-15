import React from "react";
import { Permissions } from "../../enums/permissions";
import { Login } from "../../modules/Auth/Login/Login.container";
import { permissionService } from "../../utils/services/permissions";
import { Button } from "../Button/Button";
import { ClickOutside } from "../ClickOutside";
import { NavbarProps } from "./types";

const NavbarComponent: React.FC<NavbarProps> = ({
  children,
  redirectToSignUp,
  logout,
  isVisibleLogin,
  handleChangeLoginModalState,
  isSidebarOpened,
  myName,
  role,
  visibleTwoFactor,
}) => {
  return (
    <div className="flex flex-column w-full">
      <div
        className={`flex w-full bg-black h-17 fixed z-10 ${
          !!myName ? "justify-between" : "justify-end"
        } items-center shadow-lg`}
      >
        {!!myName && (
          <span
            className={`text-white ${
              isSidebarOpened
                ? "duration-1000 transform translate-x-60"
                : "duration-1000 transform translate-x-32"
            } text-xl`}
          >
            Welcome, {myName}
          </span>
        )}
        {permissionService.isAllowed(Permissions.canLogin, role) ? (
          <div className="flex">
            <Button
              label="Login"
              bordered
              onClick={handleChangeLoginModalState}
            />
            <Button label="Sign Up" bordered onClick={redirectToSignUp} />
          </div>
        ) : (
          <Button label="Logout" bordered onClick={logout} />
        )}
        {isVisibleLogin && (
          <ClickOutside
            action={handleChangeLoginModalState}
            className={`absolute mr-12 shadow-lg ${
              visibleTwoFactor ? "mt-60" : "mt-100"
            } rounded-md`}
          >
            <Login handleChangeLoginModalState={handleChangeLoginModalState} />
          </ClickOutside>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default NavbarComponent;
