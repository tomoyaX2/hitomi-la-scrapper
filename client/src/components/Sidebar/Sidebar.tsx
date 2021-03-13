import React from "react";
import { useHistory } from "react-router-dom";
import { Routes } from "../../enums/routes";
import Navbar from "../Navbar/Navbar";
import SidebarComponent from "./Sidebar.component";

const Sidebar: React.FC = ({ children }) => {
  const history = useHistory();
  const [isOpened, setOpened] = React.useState(true);
  const [activeRoute, setActiveRoute] = React.useState(0);
  const handleChangeOpenedState = () => {
    setOpened(!isOpened);
  };

  const handleChangeRoute = (index: number, to: Routes) => () => {
    setActiveRoute(index);
    history.push(to);
  };
  return (
    <Navbar isSidebarOpened={isOpened}>
      <SidebarComponent
        isOpened={isOpened}
        handleChangeOpenedState={handleChangeOpenedState}
        activeRoute={activeRoute}
        handleChangeRoute={handleChangeRoute}
      >
        {children}
      </SidebarComponent>
    </Navbar>
  );
};

export default Sidebar;
