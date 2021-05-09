import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Roles } from "../../enums/roles";
import { Routes } from "../../enums/routes";
import { selectMe, selectUserRole } from "../../modules/Users/store/reducer";
import Navbar from "../Navbar/Navbar";
import { SidebarComponent } from "./Sidebar.component";

const selectActiveRoute = (pathname: Routes) => {
  switch (pathname) {
    case Routes.mangaList: {
      return 0;
    }
    case Routes.games: {
      return 1;
    }
    case Routes.videos: {
      return 2;
    }
    case Routes.profileSettings: {
      return 3;
    }
    default:
      return 0;
  }
};

const Sidebar: React.FC = ({ children }) => {
  const history = useHistory();
  const [isOpened, setOpened] = React.useState(true);
  const [activeRoute, setActiveRoute] = React.useState(0);
  const handleChangeOpenedState = () => {
    setOpened(!isOpened);
  };
  const role = useSelector(selectUserRole);

  React.useEffect(() => {
    if (role.name === Roles.unauth) {
      setActiveRoute(0);
    }
  }, [role]);

  React.useEffect(() => {
    const targetRoute = selectActiveRoute(history.location.pathname as Routes);
    setActiveRoute(targetRoute);
  }, []);

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
        role={role?.name}
        handleChangeRoute={handleChangeRoute}
      >
        {children}
      </SidebarComponent>
    </Navbar>
  );
};

export default Sidebar;
