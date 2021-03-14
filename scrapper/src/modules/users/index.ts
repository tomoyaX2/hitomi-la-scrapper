import { secureService } from "../auth/services";
import { DbUserService } from "./services/db";
import { UserService } from "./services/user";

const userService = new UserService(secureService);
const dbUserService = new DbUserService(userService);

export { dbUserService, userService };
