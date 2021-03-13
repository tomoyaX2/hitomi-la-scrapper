import React from "react";
import { Redirect, Route } from "react-router";
import { Routes } from "../../enums/routes";
import { permissionService } from "../../utils/services/permissions";
import { ProtectedRouteProps } from "./type";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  path,
  permission,
  children,
}) => {
  return permissionService.isAllowed(permission) ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Redirect to={Routes.main} />
  );
};

export { ProtectedRoute };
