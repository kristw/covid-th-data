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
  // มีทั้งจังหวัดว่างเปล่า และจังหวัดไม่ทราบ เลือกเอาซักอันดีไหม
  if (province === '') return 'ไม่ทราบ';

  return PROVINCE_MAP[province] || province;
}
