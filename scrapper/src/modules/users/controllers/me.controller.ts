import { dbUserService } from "..";

export const meController = async (req, res) => {
  console.log(req.headers, "HHHHEEEEADDERRRSS");
  const result = await dbUserService.selectUserByToken(
    req.headers.authorization
  );

  if (result.isSuccess) {
    res.send(result);
    return;
  }
  res.status(400).send(result);
};
