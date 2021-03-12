import { Routes } from "../../enums/routes";
import { Book } from "../../icons/Book";
import { Gamepad } from "../../icons/Gamepad";
import { IconProps } from "../../icons/types";

const dynamicStylesConfig = (isOpened: boolean) => ({
  translate: isOpened
    ? "duration-1000 transform translate-x-0"
    : "duration-1000 transform -translate-x-28",
  chevronStyle: isOpened ? "justify-end px-8" : "items-center justify-end pr-4",
  chevronRotate: isOpened ? "rotate-180" : "rotate 0",
  activeLinkStyle: (index: number, activeRoute: number) => {
    return activeRoute == index
      ? `text-black bg-white py-6 text-xl ${
          isOpened ? "px-8" : "flex justify-end pr-4"
        }`
      : `text-white py-6 text-xl ${
          isOpened ? "px-8" : "flex justify-end pr-4"
        }`;
  },
});

const links = [
  {
    label: "Manga",
    icon: (props: IconProps) => <Book {...props} />,
    to: Routes.mangaList,
  },
  {
    label: "Games",
    icon: (props: IconProps) => <Gamepad {...props} />,
    to: Routes.games,
  },
];

export { links, dynamicStylesConfig };
