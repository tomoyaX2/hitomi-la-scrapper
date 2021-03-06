import { Series } from "../../../../../models";

class SeriesService {
  constructor(public scrapperDbService) {}
  parseSeriesData = async (name) => {
    return await this.pushSeries({ name });
  };

  pushSeries = async (series) => {
    const result = await this.scrapperDbService.pushMangaData(Series, series);
    return result.id;
  };
}

export { SeriesService };
