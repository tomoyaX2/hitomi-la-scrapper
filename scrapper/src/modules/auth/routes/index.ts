import express from "express";
import { loginController } from "../controllers/login.controller";
import { resendController } from "../controllers/resend.controller";
import { signUpController } from "../controllers/signUp.controller";
import { verificationController } from "../controllers/verification.controller";

const authRouter = express.Router();

authRouter.post("/verification/resend", resendController);

authRouter.post("/login", loginController);

authRouter.post("/verification", verificationController);

authRouter.post("/signUp", signUpController);

export { authRouter };
