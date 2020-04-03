const fs = require('fs');
const path = require('path');

module.exports = function saveJson(filename, data) {
  fs.writeFileSync(
    path.join(__dirname, `../processed/${filename}.json`),
    JSON.stringify(data, null, 2),
    'utf-8'
  );
  fs.writeFileSync(
    path.join(__dirname, `../processed/${filename}.min.json`),
    JSON.stringify(data),
    'utf-8'
  );
};
