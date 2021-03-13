import { dbAuthService, verificationService } from "../services";


export const resendController = async (req, res) => {
  const { userId } = req.body;
  const data = await dbAuthService.verifyResendState(userId);
  if (data.isSuccess) {
    const result = await verificationService.initResendCode(
      data.user.email,
      userId
    );
    const status = result.isSuccess ? 200 : 400;
    res.status(status).send(result);
    return;
  }
  res.status(400).send(data);
}