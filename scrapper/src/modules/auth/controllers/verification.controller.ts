import { dbAuthService } from "../services";

export const verificationController = async (req, res) => {
  const { code, userId } = req.body;
  const result = await dbAuthService.initiateUserActivation(code, userId);
  const status = result.isSuccess ? 200 : 400;
  res.status(status).send(result);
}