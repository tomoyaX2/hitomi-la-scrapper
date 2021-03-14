import { verificationService } from "../services";

export const submitPhoneController = async (req, res) => {
  const result = await verificationService.submitPhone(
    req.body.code,
    req.body.userId
  );
  if (!result.isSuccess) {
    res.status(400).send(result);
    return;
  }
  res.send(result);
  return;
};
