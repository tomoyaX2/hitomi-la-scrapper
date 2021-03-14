import { dbUserService } from "..";
import { authService } from "../../auth/services";

export const updateProfileController = async (req, res) => {
  if (!!req.body.password) {
    const isValidResult = await authService.initCompareOldPassword(
      req.body.credentialId,
      req.body.oldPassword
    );
    if (!isValidResult.isSuccess) {
      return res.status(400).send(isValidResult);
    }
  }
  const result = await dbUserService.updateUserProfileData(req.body);
  if (!result.isSuccess) {
    res.status(400).send(result);
    return;
  }
  res.send(result);
  return;
};
