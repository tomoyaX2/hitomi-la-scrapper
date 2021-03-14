import { Roles } from "../../enums/roles";
import { Routes } from "../../enums/routes";

export type SidebarProps = {
  isOpened: boolean;
  handleChangeOpenedState: () => void;
  activeRoute: number;
  role: Roles;
  handleChangeRoute: (index: number, to: Routes) => () => void;
};
