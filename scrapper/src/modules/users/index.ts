import { fileSystemService } from "../filesystem";
import { secureService, verificationService } from "../auth/services";
import { DbUserService } from "./services/db";
import { UserService } from "./services/user";

const userService = new UserService(
  secureService,
  verificationService,
  fileSystemService
);
const dbUserService = new DbUserService(userService, verificationService);

export { dbUserService, userService };
