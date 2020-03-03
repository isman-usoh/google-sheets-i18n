const GoogleSpreadsheet = require("google-spreadsheet");
const Promise = require("bluebird");
const path = require("path");

const getConfig = () => {
  try {
    return require(path.join(process.cwd(), "i18n-google-spreadsheets.config"));
  } catch (err) {
    return null;
  }
};

const getDocument = sheetId => Promise.promisifyAll(new GoogleSpreadsheet(sheetId));

const authorizeConnection = (credentialsPath, doc) => {
  const creds = require(credentialsPath);
  return doc.useServiceAccountAuthAsync(creds);
};

module.exports = {
  getConfig,
  getDocument,
  authorizeConnection
};
