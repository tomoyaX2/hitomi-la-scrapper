const express = require("express");
import { authService, dbAuthService, verificationService } from "../services";
const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const data = { login: "test", password: "nagisa" };
  const result = await authService.initLogin(data);
  res.send(result);
});

authRouter.post("/verification", async (req, res) => {
  const { code, userId } = req.body;
  const result = await dbAuthService.initiateUserActivation(code, userId);
  const status = result.isSuccess ? 200 : 400;
  res.status(status).send(result);
});

authRouter.post("/signUp", async (req, res) => {
  const { password, passwordConfirm, email, name, login } = req.body;
  const isValidPasswords = authService.validateIncomingPasswords(
    password,
    passwordConfirm
  );
  if (!isValidPasswords) {
    res.status(400).send({
      isSuccess: false,
      errors: { password: "Passwords doesn't match" },
    });
    return;
  }
  const result = await authService.initRegistration({
    password,
    email,
    name,
    login,
  });
  if (!!result.userId) {
    await verificationService.initVeririfcation(email, result.userId);
  }
  res.send(result);
});

export { authRouter };
