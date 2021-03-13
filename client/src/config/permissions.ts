import { Permissions } from "../enums/permissions";
import { Roles } from "../enums/roles";

const permissions = {
  [Permissions.viewAdminPanel]: [Roles.admin],
  [Permissions.viewCabinet]: [Roles.admin, Roles.user],
  [Permissions.canDownload]: [Roles.admin, Roles.user],
  [Permissions.canLogin]: [Roles.unauth],
  [Permissions.canRegister]: [Roles.unauth],
};

export { permissions };
