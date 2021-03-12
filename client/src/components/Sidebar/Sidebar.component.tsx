import React from "react";
import { NavLink } from "react-router-dom";
import { ThreeArrowChevron } from "../../icons/ThreeArrowChevron";
import { dynamicStylesConfig, links } from "./utils";

const NavbarComponent: React.FC = ({ children }) => {
  const [isOpened, setOpened] = React.useState(true);
  const [activeRoute, setActiveRoute] = React.useState(0);
  const handleChangeOpenedState = () => {
    setOpened(!isOpened);
  };

  const handleChangeRoute = (index: number) => () => {
    setActiveRoute(index);
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
        className={`flex flex-col bg-black w-56 ${translateSidebar} py-4 h-screen absolute`}
      >
        <div className={`flex w-full h-24 ${chevronStyle} `}>
          <ThreeArrowChevron
            fill="white"
            onClick={handleChangeOpenedState}
            className={`w-16 h-16 cursor-pointer transform ${chevronRotate}`}
          />
        </div>
        {links.map((el, index) => (
          <NavLink
            className={activeLinkStyle(index, activeRoute)}
            key={index}
            onClick={handleChangeRoute(index)}
            to={el.to}
          >
            {isOpened
              ? el.label
              : el.icon({ fill: activeRoute == index ? "black" : "white" })}
          </NavLink>
        ))}
      </div>
      <div className={`pl-4 mt-20 ${translateContent}`}>{children}</div>
    </div>
  );
};

export default NavbarComponent;