import { Permissions } from "../../enums/permissions";
import { Routes } from "../../enums/routes";
import { Book } from "../icons/Book";
import { Gamepad } from "../icons/Gamepad";
import { Settings } from "../icons/Settings";
import { IconProps } from "../icons/types";

const dynamicStylesConfig = (isOpened: boolean) => ({
  translateSidebar: isOpened
    ? "duration-1000 transform translate-x-0"
    : "duration-1000 transform -translate-x-28",
  translateContent: isOpened
    ? "duration-1000 transform translate-x-60"
    : "duration-1000 transform translate-x-32",
  chevronStyle: isOpened ? "justify-end px-4" : "items-center justify-end pr-4",
  chevronRotate: isOpened ? "rotate-180" : "rotate 0",
  activeLinkStyle: (index: number, activeRoute: number) => {
    return activeRoute == index
      ? `text-black bg-white py-4 text-xl cursor-pointer	 ${
          isOpened ? "px-9" : "flex justify-end pr-4"
        }`
      : `text-white py-4 text-xl cursor-pointer ${
          isOpened ? "px-9" : "flex justify-end pr-4"
        }`;
  },
});

const links = [
  {
    label: "Manga",
    icon: (props: IconProps) => <Book {...props} />,
    to: Routes.mangaList,
    permission: Permissions.readManga,
  },
  {
    label: "Games",
    icon: (props: IconProps) => <Gamepad {...props} />,
    to: Routes.games,
    permission: Permissions.viewGames,
  },
  {
    label: "Profile Settings",
    icon: (props: IconProps) => <Settings {...props} />,
    to: Routes.profileSettings,
    permission: Permissions.viewProfileSettings,
  },
];

export { links, dynamicStylesConfig };
