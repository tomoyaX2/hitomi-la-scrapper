import { authService } from "../services";

export const twoFactorController = async (req, res) => {
  const result = await authService.initTwoFactorLogin(req.body);
  if (!result.isSuccess) {
    res.status(400).send(result);
    return;
  }
  res.send(result);
  return result;
};
