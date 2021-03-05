import { Series } from "../../../../models";
import uuid from "uuid";

class SeriesService {
  constructor(public scrapperDbService) {}
  parseSeriesData = async (series) => {
    const result = { id: uuid.v4(), name: series };
    return await this.pushSeries(result);
  };

  pushSeries = async (series) => {
    const result = await this.scrapperDbService.pushProjectData(Series, series);
    return result.id;
  };
}

export { SeriesService };
