import { Roles } from "../../enums/roles";
import { UserData } from "../../modules/Users/store/types";

export type NavbarProps = {
  redirectToSignUp: () => void;
  logout: () => void;
  handleChangeLoginModalState: () => void;
  isVisibleLogin: boolean;
  isSidebarOpened: boolean;
  myName: string;
  role: Roles;
};
