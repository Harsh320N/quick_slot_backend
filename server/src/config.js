const path = require('path');

module.exports = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',
  dbPath: process.env.DB_PATH || path.join(__dirname, '..', 'data', 'quickslot.db'),
  openHour: 6,
  closeHour: 22,
};
