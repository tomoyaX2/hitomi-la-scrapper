import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { Routes } from "../../enums/routes";
import { selectMe, selectUserRole } from "../../modules/Users/store/reducer";
import { permissionService } from "../../utils/services/permissions";
import { ProtectedRouteProps } from "./type";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  path,
  permission,
  children,
}) => {
  const role = useSelector(selectUserRole);
  return permissionService.isAllowed(permission, role?.name) ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Redirect to={Routes.main} />
  );
};

export { ProtectedRoute };
