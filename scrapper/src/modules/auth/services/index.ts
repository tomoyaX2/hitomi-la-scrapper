import { AuthService } from "./auth";
import { DbAuthService } from "./db";
import { DbSearchService } from "./dbSearch";
import { SecureService } from "./secure";
import { VerificationService } from "./verification";

const dbSearchService = new DbSearchService();
const secureService = new SecureService();
const dbAuthService = new DbAuthService(secureService, dbSearchService);
const authService = new AuthService(
  dbAuthService,
  secureService,
  dbSearchService
);
const verificationService = new VerificationService(
  dbAuthService,
  secureService
);

export {
  authService,
  dbAuthService,
  verificationService,
  secureService,
  dbSearchService,
};
