const { dbService } = require("../db");
const uuid = require("uuid");

class SeriesService {
  parseSeriesData = (series) => {
    const result = { id: uuid.v4(), name: series };
    return this.verifyExistedSeries(result);
  };

  verifyExistedSeries = (series) => {
    const existed = dbService.series.find((el) => el.name === series.name);
    if (!existed) {
      dbService.pushSeries(series);
      return series.id;
    }
    return existed.id;
  };
}

const seriesService = new SeriesService();

module.exports = { seriesService };
