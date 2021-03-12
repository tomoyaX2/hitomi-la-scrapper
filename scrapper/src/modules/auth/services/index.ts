import { AuthService } from "./auth";
import { DbAuthService } from "./db";
import { VerificationService } from "./verification";

const dbAuthService = new DbAuthService();
const authService = new AuthService(dbAuthService);
const verificationService = new VerificationService();

export { authService, dbAuthService, verificationService };
