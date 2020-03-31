const fs = require('fs');
const path = require('path');
const cleanProvince = require('./cleanProvince');
const parseDate = require('./parseDate');

const response = JSON.parse(fs.readFileSync(path.join(__dirname, '../raw/covidThPatients.json'), 'utf8'));

const records = response.result.records.map(record => {
  return {
    id: record.no,
    name: record.name,
    // ใช้ empty string ไม่ชัดเจน
    age: record.age === '' ? null : +record.age,
    sex: record.sex,
    nation: record.nation,
    // อันนี้อยู่ดีๆก็นึกจะใช้ snake_case naming
    occupation: record.occ_new,
    province: cleanProvince(record.Province),
    // อันนี้ชื่อ field Capitalize ซะเฉยๆ
    risk: record.Risk,
    // อันนี้ชื่อ field Capitalize ซะเฉยๆ
    district: record.District === '' ? undefined : record.District,
    // ชื่อ field อันนี้เว้นวรรค ไม่ดีเลย ใช้ลำบาก
    notificationDate: record['Notification date'] === null ? undefined : parseDate(record['Notification date']),
    // ชื่อ field อันนี้เว้นวรรค แถม Date ใช้ D ตัวใหญ่ ข้างบนใช้ d ตัวเล็ก
    announceDate: parseDate(record['Announce Date']),
  };
});

fs.writeFileSync(
  path.join(__dirname, '../processed/covidThPatients.json'),
  JSON.stringify({ records }),
  'utf-8'
);
