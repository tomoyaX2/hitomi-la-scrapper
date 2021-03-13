import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Routes } from "../../enums/routes";
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
      isSidebarOpened={isSidebarOpened}
      handleChangeLoginModalState={handleChangeLoginModalState}
      logout={initLogout}
    >
      {children}
    </NavbarComponent>
  );
};

export default Navbar;
