const provinces = require('gridmap-layout-thailand');
const ed = require('edit-distance');
const _ = require('lodash');

const provinceNames = provinces
  .map(p => p.thName)
  .filter(name => name !== 'กรุงเทพมหานคร')
  .concat(['ไม่ทราบ', 'กทม']);
const provinceNameSet = new Set(provinceNames);

const PROVINCE_MAP = {
  กรุงเทพ: 'กทม',
  นทบุรี: 'นนทบุรี',
  นนทุบุรี: 'นนทบุรี',
  ภูก็ต: 'ภูเก็ต',
  สมุุทรปราการ: 'สมุทรปราการ',
  ชลบุุรี: 'ชลบุรี',
};

module.exports = function cleanProvince(input) {
  const province = input.trim();
  if (province === '') return 'ไม่ทราบ';

  const manuallyCleaned = PROVINCE_MAP[province] || province;
  if (provinceNameSet.has(manuallyCleaned)) {
    return manuallyCleaned;
  }

  // Find closest match
  const closestMatch = _.minBy(provinceNames, p => ed.levenshtein(manuallyCleaned, p));
  console.log(`Clean: "${province}" => "${closestMatch}"`);
}
