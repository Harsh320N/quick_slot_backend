const path = require('path');

module.exports = {
  port: process.env.PORT || 3000,
  dbPath: process.env.DB_PATH || path.join(__dirname, '..', 'data', 'quickslot.db'),
  // venues run hourly slots from 6 AM to 10 PM
  openHour: 6,
  closeHour: 22,
};
