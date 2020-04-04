const provinces = require('gridmap-layout-thailand');
const ed = require('edit-distance');
const _ = require('lodash');

const provinceNames = provinces
  .map(p => p.thName)
  .filter(name => name !== 'กรุงเทพมหานคร')
  .concat(['ไม่ทราบ', 'กทม']);
const provinceNameSet = new Set(provinceNames);

const PROVINCE_MAP = {
  กรุงเทพมหานคร: 'กทม',
  กรุงเทพ: 'กทม',
  นทบุรี: 'นนทบุรี',
  นนทุบุรี: 'นนทบุรี',
  ภูก็ต: 'ภูเก็ต',
  สมุุทรปราการ: 'สมุทรปราการ',
  ชลบุุรี: 'ชลบุรี',
};

// Define cost functions.
const insert = n => 1;
const remove = n => 1;
const update = (stringA, stringB) => stringA !== stringB ? 1 : 0;

module.exports = function cleanProvince(input) {
  const province = (input || '').trim();
  if (province === '') {
    return 'ไม่ทราบ';
  }

  const manuallyCleaned = PROVINCE_MAP[province] || province;
  if (provinceNameSet.has(manuallyCleaned)) {
    if (province !== manuallyCleaned) {
      console.log(`Clean: "${province}" => "${manuallyCleaned}"`);
    }
    return manuallyCleaned;
  }

  // Find closest match
  const closestMatch = _.minBy(provinceNames, p => ed.levenshtein(manuallyCleaned, p, insert, remove, update).distance);
  console.log(`Clean: "${province}" => "${closestMatch}"`);
  return closestMatch;
}
