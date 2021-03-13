import { dbUserService, userService } from "..";

export const meController = async (req, res) => {
  const result = await dbUserService.selectUserByToken(
    req.headers.authorization
  );

  if (result.isSuccess) {
    const userToResponse = userService.formatUserDataToResponse(result.data);
    res.send({ ...result, data: userToResponse });
    return;
  }
  res.status(400).send(result);
};
