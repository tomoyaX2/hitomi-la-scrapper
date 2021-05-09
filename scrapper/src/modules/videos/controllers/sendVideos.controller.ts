import { videosService } from "..";

export const sendVideosController = async (req, res) => {
  const result = await videosService.getOne(req.params.id);

  if (result.isSuccess) {
    res.send(result);
    return;
  }
  res.status(400).send(result);
};
