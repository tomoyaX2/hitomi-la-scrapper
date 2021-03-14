import { permissions } from "../../config/permissions";
import { Permissions } from "../../enums/permissions";
import { Roles } from "../../enums/roles";

class PermissionsService {
  isAllowed = (permission: Permissions, userRole: Roles) => {
    return permissions[permission].some((role) => role === userRole);
  };
}

const permissionService = new PermissionsService();

export { permissionService };
