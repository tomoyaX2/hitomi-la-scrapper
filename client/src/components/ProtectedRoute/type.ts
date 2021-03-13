import { Permissions } from "../../enums/permissions";
import { Routes } from "../../enums/routes";

export type ProtectedRouteProps = {
  path: Routes;
  permission: Permissions;
};
