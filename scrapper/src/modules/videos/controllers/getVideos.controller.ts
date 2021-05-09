import { videosService } from "..";

export const getVideosController = async (req, res) => {
  const result = await videosService.getAllVideos();

  if (result.isSuccess) {
    res.status(200).send(result);
    return;
  }
  res.status(400).send(result);
};
