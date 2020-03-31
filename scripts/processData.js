const moment = require('moment');
const fs = require('fs');
const path = require('path');

const NOW = new Date().getTime();

function parseDate(str) {
  if (str === null) return null;
  const date = moment.utc(str, 'YYYY-MM-DDTHH:mm:ss');

  // Swap month and date
  if (date.valueOf() > NOW) {
    return moment.utc(str, 'YYYY-DD-MMTHH:mm:ss').toJSON();
  }
  return date.toJSON();
}

const response = JSON.parse(fs.readFileSync(path.join(__dirname, '../raw/covidThPatients.json'), 'utf8'));

const records = response.result.records.map(record => {
  let province = record.Province.trim();
  // มีทั้งจังหวัดว่างเปล่า และจังหวัดไม่ทราบ เลือกเอาซักอันดีไหม
  if (province === '') province = 'ไม่ทราบ';
  // เช่นเดียวกับ กทม. และกรุงเทพ
  else if (province === 'กรุงเทพ') province = 'กทม';
  else if (province === 'นทบุรี') province = 'นนทบุรี';
  else if (province === 'นนทบุรี') province = 'นนทบุรี';
  else if (province === 'นนทุบุรี') province = 'นนทบุรี';
  else if (province === 'ภูก็ต') province = 'ภูเก็ต';
  else if (province === 'สมุุทรปราการ') province = 'สมุทรปราการ';
  else if (province === 'ชลบุุรี') province = 'ชลบุรี';

  return {
    // field นี้ดันมี _ นำหน้าอยู่อันเดียว
    id: record._id,
    name: record.name,
    // ใช้ empty string ไม่ชัดเจน
    age: record.age === '' ? null : +record.age,
    sex: record.sex,
    nation: record.nation,
    // อันนี้อยู่ดีๆก็นึกจะใช้ snake_case naming
    occupation: record.occ_new,
    province,
    // อันนี้ชื่อ field Capitalize ซะเฉยๆ
    risk: record.Risk,
    // อันนี้ชื่อ field Capitalize ซะเฉยๆ
    district: record.District,
    // ชื่อ field อันนี้เว้นวรรค ไม่ดีเลย ใช้ลำบาก
    // วันที่ที่ส่งมาเป็น string ต้อง parse ก่อน
    // จริงๆชอบส่งเป็น timestamp (millisecond from epoch) ยัดใส่ new Date() ได้เลย
    notificationDate: parseDate(record['Notification date']),
    // ชื่อ field อันนี้เว้นวรรค แถม Date ใช้ D ตัวใหญ่ ข้างบนใช้ d ตัวเล็ก
    announceDate: parseDate(record['Announce Date']),
  };
});

fs.writeFileSync(
  path.join(__dirname, '../processed/covidThPatients.json'),
  JSON.stringify({ records }),
  'utf-8'
);
