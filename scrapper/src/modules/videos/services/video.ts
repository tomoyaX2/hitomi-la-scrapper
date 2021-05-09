import { VideoDbService } from "./db";

class VideoService {
  constructor(public videoDbService: VideoDbService) {}

  getAllVideos = async () => {
    const result = await this.videoDbService.selectList();
    return result;
  };

  getOne = async (id) => {
    const result = await this.videoDbService.selectOne(id);
    return result;
  };
}

export { VideoService };
