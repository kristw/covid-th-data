const moment = require('moment');

module.exports = function parseDate(str) {
  if (str === null) return null;
  return moment.utc(str, 'YYYY-MM-DDTHH:mm:ss').toDate();
}

