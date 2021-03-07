import { Series } from "../../../../models";
import uuid from "uuid";

class SeriesService {
  constructor(public scrapperDbService) {}
  parseSeriesData = async (name) => {
    return await this.pushSeries({ name });
  };

  pushSeries = async (series) => {
    const result = await this.scrapperDbService.pushProjectData(Series, series);
    return result.id;
  };
}

export { SeriesService };
