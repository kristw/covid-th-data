const d3 = require('d3');
const _ = require('lodash');

module.exports = function createTimeSeriesByProvince(records) {
  const newCasesMap = _(records)
    .groupBy(({ announceDate }) => `${announceDate.getTime()}`)
    .mapValues(rows => ({
      all: rows,
      ..._.groupBy(rows, ({ province }) => province)
    }))
    .value();

  const timeRange = d3.extent(records, r => r.announceDate.getTime());
  const steps = d3.range(timeRange[0], timeRange[1] + 1, 60 * 60 * 24 * 1000);

  const provinces = Array.from(new Set(records.map(r => r.province))).sort();

  return (['all'].concat(provinces))
    .map(province => steps.reduce((acc, time) => {
      const newCaseAtTime = newCasesMap[time] || {};
      const newCaseArray = newCaseAtTime[province];
      const newCases = newCaseArray ? newCaseArray.length : 0;

      acc.push({
        province,
        time: new Date(time),
        newCases,
        totalCases: newCases + (acc.length > 0 ? acc[acc.length - 1].totalCases : 0),
      });

      return acc;
    }, []))
    .flat();
}