import { DbUserService } from "./services/db";
import { UserService } from "./services/user";

const dbUserService = new DbUserService();
const userService = new UserService();

export { dbUserService, userService };
