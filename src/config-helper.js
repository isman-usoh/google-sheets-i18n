const { GoogleSpreadsheet } = require("google-spreadsheet");
const path = require("path");

const getConfig = () => {
  try {
    return require(path.join(process.cwd(), "i18n.config"));
  } catch (err) {
    return null;
  }
};

const getDocument = async ({ sheetId, credentialsPath }) => {
  const doc = new GoogleSpreadsheet(sheetId);
  await doc.useServiceAccountAuth(require(credentialsPath));
  return doc;
};

module.exports = {
  getConfig,
  getDocument
};
