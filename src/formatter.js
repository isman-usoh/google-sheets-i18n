/**
 *  Formats rows into the { key : { language: translation } } object
 *  ie. {
 *  	"common.greeting": {
 *  		"en_CA": "Hello!",
 *  		"fr_CA": "Bonjour!"
 *  	}
 *  }
 */

const formatRow = ({ row, categories, languages, delimiter }) => {
  let rowKey = categories.reduce((acc, category, _index, array) => {
    if (row[array[0]] === null || row[array[0]] === "#") {
      return null;
    }

    if (!row[category]) {
      return acc;
    }

    return acc + delimiter + row[category];
  }, "");

  if (!rowKey) {
    return null;
  }

  rowKey = rowKey.substr(1);

  return {
    [rowKey]: languages.reduce((acc, language) => {
      acc[language] = row[language.replace(/_/, "").toLowerCase()];
      return acc;
    }, {})
  };
};

module.exports = formatRow;
