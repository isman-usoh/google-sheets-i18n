const { getConfig, getDocument, authorizeConnection } = require("./config-helper");
const { getInfo } = require("./sheets-helper");

const printSheetsInfo = ({ worksheets }) => {
  worksheets.forEach(({ title }) => {
    console.log(title);
  });
};

const sheets = () => {
  const config = getConfig();
  const doc = getDocument(config);

  authorizeConnection(config, doc)
    .then(() => getInfo(doc))
    .then(printSheetsInfo);
};

module.exports = sheets;
