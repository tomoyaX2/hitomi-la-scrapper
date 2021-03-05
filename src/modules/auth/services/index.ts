import { AuthService } from "./auth";
import { DbAuthService } from "./db";

const dbAuthService = new DbAuthService();
const authService = new AuthService(dbAuthService);

export { authService, dbAuthService };
