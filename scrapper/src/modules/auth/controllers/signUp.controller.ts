import { authService, verificationService } from "../services";

export const signUpController = async (req, res) => {
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
  if (!result.isSuccess) {
    res.status(400).send(result);
    return;
  }
  if (!!result.userId) {
    await verificationService.initVeririfcation(email, result.userId);
  }
  res.send(result);
};
