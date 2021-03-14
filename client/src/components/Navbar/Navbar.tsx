import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Routes } from "../../enums/routes";
import { selectAuthState } from "../../modules/Auth/store/reducer";
import { logout } from "../../modules/Users/store/actions";
import { selectMe } from "../../modules/Users/store/reducer";
import NavbarComponent from "./Navbar.component";

const Navbar: React.FC<{ isSidebarOpened: boolean }> = ({
  children,
  isSidebarOpened,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isVisibleLogin, setVisibleLogin] = React.useState(false);
  const me = useSelector(selectMe);
  const { visibleTwoFactor } = useSelector(selectAuthState);
  const redirectToSignUp = () => {
    history.push(Routes.signUp);
  };

  const initLogout = () => {
    dispatch(logout());
  };

  const handleChangeLoginModalState = () => {
    setVisibleLogin(!isVisibleLogin);
  };
  return (
    <NavbarComponent
      redirectToSignUp={redirectToSignUp}
      isVisibleLogin={isVisibleLogin}
      myName={me.name}
      role={me?.role?.name}
      isSidebarOpened={isSidebarOpened}
      handleChangeLoginModalState={handleChangeLoginModalState}
      logout={initLogout}
      visibleTwoFactor={visibleTwoFactor}
    >
      {children}
    </NavbarComponent>
  );
};

export default Navbar;
