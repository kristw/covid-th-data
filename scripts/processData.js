const fs = require('fs');
const path = require('path');
const cleanProvince = require('./cleanProvince');
const parseDate = require('./parseDate');
const saveJson = require('./saveJson');
const createTimeSeriesByProvince = require('./createTimeSeriesByProvince');

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
    province: cleanProvince(record['Province of isolation']),
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

records
  .forEach((record, i) => {
    if (!record.announceDate) {
      record.announceDate = records[i-1].announceDate;
    }
  })

const NOW = new Date().getTime();
const lastDate = records[records.length - 1].announceDate.getTime();

records
  .forEach(record => {
    const { announceDate } = record;
    const timestamp = announceDate.valueOf();
    if (announceDate.getUTCDate() <= 12 && (timestamp > NOW || timestamp > lastDate)) {
      record.announceDate = new Date(Date.UTC(announceDate.getUTCFullYear(), announceDate.getUTCDate() - 1, announceDate.getUTCMonth() + 1));
      console.log('clean: swap date and month of', announceDate.toJSON(), '=>', record.announceDate.toJSON());
    }
  });



saveJson('covidThPatients', { records });
saveJson('timeSeriesByProvince', createTimeSeriesByProvince(records));
