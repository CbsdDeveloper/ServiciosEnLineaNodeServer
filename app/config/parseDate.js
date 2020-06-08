
const dateFormat = require('./dateFormat');

const now = new Date();

const format = {
  'date': 'yyyy-mm-dd',
  'dateTime': 'yyyy-mm-dd h:MM:ss'
};

module.exports = { dateFormat, now, format };