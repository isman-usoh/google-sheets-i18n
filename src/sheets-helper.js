const Promise = require("bluebird");

const getInfo = doc => Promise.fromCallback(cb => doc.getInfo(cb));

const getRows = worksheet => Promise.fromCallback(cb => worksheet.getRows(cb));

module.exports = {
  getInfo,
  getRows
};
