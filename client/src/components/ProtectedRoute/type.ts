import { Routes } from "../../enums/routes";

export type ProtectedRouteProps = {
  to: Routes;
  permission: Permissions;
};
