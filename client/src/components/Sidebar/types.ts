import { Routes } from "../../enums/routes";

export type SidebarProps = {
  isOpened: boolean;
  handleChangeOpenedState: () => void;
  activeRoute: number;
  handleChangeRoute: (index: number, to: Routes) => () => void;
};
