import { permissions } from "../../config/permissions";
import { Permissions } from "../../enums/permissions";
import { Roles } from "../../enums/roles";

class PermissionsService {
  currentRole = Roles.unauth;

  setupRole = (role: Roles) => {
    this.currentRole = role;
  };

  isAllowed = (permission: Permissions) => {
    return permissions[permission].some((role) => role === this.currentRole);
  };
}

const permissionService = new PermissionsService();

export { permissionService };
