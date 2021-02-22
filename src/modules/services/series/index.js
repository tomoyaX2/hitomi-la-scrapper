const { scrapperDbService } = require("../db/scrapperDb.js");
const uuid = require("uuid");
const { Series } = require("../../../../models");

class SeriesService {
  parseSeriesData = async (series) => {
    const result = { id: uuid.v4(), name: series };
    return await this.pushSeries(result);
  };

  pushSeries = async (series) => {
    const result = await scrapperDbService.pushProjectData(Series, series);
    return result.id;
  };
}

const seriesService = new SeriesService();

module.exports = { seriesService };
