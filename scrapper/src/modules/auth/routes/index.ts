const express = require("express");
const { authService } = require("../services");
const authRouter = express.Router();

authRouter.get("/login", async (req, res) => {
  const data = { login: "test", password: "nagisa" };
  const result = await authService.initLogin(data);
  res.send(result);
});

authRouter.get("/signUp", async (req, res) => {
  const data = {
    name: "test",
    email: "test@email.test",
    login: "test",
    password: "nagisa",
  };
  const result = await authService.initRegistration(data);
  res.send(result);
});

export { authRouter };
