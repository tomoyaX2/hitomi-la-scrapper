import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Routes } from "../../enums/routes";
import { ThreeArrowChevron } from "../../icons/ThreeArrowChevron";
import { dynamicStylesConfig, links } from "./utils";

const NavbarComponent: React.FC = ({ children }) => {
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

  const {
    translateSidebar,
    chevronRotate,
    chevronStyle,
    activeLinkStyle,
    translateContent,
  } = dynamicStylesConfig(isOpened);

  return (
    <div className="flex w-full">
      <div
        className={`flex flex-col bg-black w-56 ${translateSidebar} py-1 h-screen absolute shadow-lg`}
      >
        <div className={`flex w-full h-16 items-start ${chevronStyle} `}>
          <ThreeArrowChevron
            fill="white"
            onClick={handleChangeOpenedState}
            className={`w-16 h-12 cursor-pointer transform ${chevronRotate}`}
          />
        </div>
        {links.map((el, index) => (
          <span
            className={activeLinkStyle(index, activeRoute)}
            key={index}
            onClick={handleChangeRoute(index, el.to)}
          >
            {isOpened
              ? el.label
              : el.icon({ fill: activeRoute == index ? "black" : "white" })}
          </span>
        ))}
      </div>
      <div className={`pl-4 mt-20 ${translateContent}`}>{children}</div>
    </div>
  );
};

export default NavbarComponent;
