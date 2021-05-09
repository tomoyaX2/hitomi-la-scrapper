import { VideoDbService } from "./services/db";
import { VideoService } from "./services/video";

const videoDbService = new VideoDbService();
const videosService = new VideoService(videoDbService);

export { videosService, videoDbService };
