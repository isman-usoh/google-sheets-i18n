const { getConfig, getDocument } = require("./config-helper");

const printSheetsInfo = worksheets => {
  worksheets.forEach(({ title }) => {
    console.log(title);
  });
};

const sheets = async () => {
  const config = getConfig();
  const doc = await getDocument(config);
  await doc.loadInfo();
  const worksheets = doc.sheetsByIndex;
  printSheetsInfo(worksheets);
};

module.exports = sheets;
