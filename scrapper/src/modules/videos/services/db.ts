import { Video } from "../../../../models";

class VideoDbService {
  constructor() {}

  selectList = async () => {
    try {
      const data = await Video.findAll();
      return { isSuccess: true, data, errors: null };
    } catch (errors) {
      return { isSuccess: false, data: null, errors };
    }
  };

  selectOne = async (id) => {
    try {
      const data = await Video.findOne({ where: { id } });
      return { isSuccess: true, data, errors: null };
    } catch (errors) {
      return { isSuccess: false, data: null, errors };
    }
  };
}

export { VideoDbService };
