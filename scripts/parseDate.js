const moment = require('moment');
const NOW = new Date().getTime();

module.exports = function parseDate(str) {
  if (str === null) return null;
  const date = moment.utc(str, 'YYYY-MM-DDTHH:mm:ss');

  // Swap month and date
  if (date.valueOf() > NOW) {
    return moment.utc(str, 'YYYY-DD-MMTHH:mm:ss').toDate();
  }
  return date.toDate();
}

