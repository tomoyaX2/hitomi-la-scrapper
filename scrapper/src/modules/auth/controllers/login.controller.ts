import { authService } from "../services";

export const loginController = async (req, res) => {
  const result = await authService.initLogin(req.body);
  if (result.isSuccess) {
    res.send(result);
    return;
  }
  res.status(400).send(result);
  return;
};
