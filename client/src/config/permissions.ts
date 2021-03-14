import { Permissions } from "../enums/permissions";
import { Roles } from "../enums/roles";

const permissions = {
  [Permissions.viewAdminPanel]: [Roles.admin],
  [Permissions.viewProfileSettings]: [Roles.admin, Roles.user],
  [Permissions.canDownload]: [Roles.admin, Roles.user],
  [Permissions.canLogin]: [Roles.unauth],
  [Permissions.canRegister]: [Roles.unauth],
  [Permissions.readManga]: [Roles.admin, Roles.unauth, Roles.user],
  [Permissions.viewGames]: [Roles.admin, Roles.unauth, Roles.user],
};

export { permissions };
