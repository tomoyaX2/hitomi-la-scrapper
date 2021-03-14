import React from "react";
import { permissionService } from "../../utils/services/permissions";
import { ThreeArrowChevron } from "../icons/ThreeArrowChevron";
import { SidebarProps } from "./types";
import { dynamicStylesConfig, links } from "./utils";

const SidebarComponent: React.FC<SidebarProps> = ({
  children,
  isOpened,
  handleChangeOpenedState,
  activeRoute,
  handleChangeRoute,
  role,
}) => {
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
        {links.map((el, index) =>
          permissionService.isAllowed(el.permission, role) ? (
            <span
              className={activeLinkStyle(index, activeRoute)}
              key={index}
              onClick={handleChangeRoute(index, el.to)}
            >
              {isOpened
                ? el.label
                : el.icon({ fill: activeRoute == index ? "black" : "white" })}
            </span>
          ) : null
        )}
      </div>
      <div className={`pl-4 mt-20 ${translateContent}`}>{children}</div>
    </div>
  );
};

export { SidebarComponent };
