# Introduction

> The way for translations files to be generated using Google Spreadsheets.
> This tools fetches the data from the Google Spreadsheets and creates the JSON files suitable for immediate usage with the tools like [i18next](https://www.i18next.com/) or later transformed to any format of the user's choice.

The project is a fork of the original `google-sheet-i18n` [by @tanatornn96](https://github.com/tanatornn96) with the following differences:

- to handle the Google's [deprecation of its G-suite API v3](https://cloud.google.com/blog/products/g-suite/migrate-your-apps-use-latest-sheets-api) the dependency `google-spreadsheet` is upgraded to v3,
- **Breaking**: to simplify the code custom formatters are removed, the only output format is JSON which can later be transformed by any tool of the user's choice,
- the code was modernized and simplified,
- Babel transpilation is removed, the code works with Node.js >= 10 which supports fair amount of ES6 features,
- **Breaking**: categories are now case-sensitive, as well as the language column names must exactly match the configuration.

# Setup

## Google Spreadsheets Configuration

Each sheet in the spreadsheet is transformed to a folder on the disc.

The first row of the sheet defines the (optional) categories, i18n keys, and the set of locales.

Each subsequent row is a single i18n record:

|  Category  | SubCategory | ... | Message |   en_CA   |   en_FR    | ... |
| :--------: | :---------: | :-: | :-----: | :-------: | :--------: | :-: |
| onboarding |   landing   | ... |  intro  |  Hello!   |  Bonjour!  | ... |
| onboarding |   landing   | ... |  exit   | Good bye! | Au revior! | ... |

## CLI Configuration

Configuration requires a credentials JSON file that can be obtained through Google's developer console with the following instructions (partially borrowed from [node-google-spreadsheet](https://github.com/theoephraim/node-google-spreadsheet)):

1. Go to the [Google Developers Console](https://console.developers.google.com/project)
2. Select your project or create a new one (and then select it)
3. Enable the Drive API for your project

- In the sidebar on the left, expand **APIs & auth** > **APIs**
- Search for "drive"
- Click on "Drive API"
- click the blue "Enable API" button

4. Create a service account for your project

- In the sidebar on the left, expand **APIs & auth** > **Credentials**
- Click blue "Add credentials" button
- Select the "Service account" option
- Select the "JSON" key type option
- Click blue "Create" button
- your JSON key file is generated and downloaded to your machine (**it is the only copy!**)
- note your service account's email address (also available in the JSON key file)

5. Share the doc (or docs) with your service account using the email noted above

## Running the Translations

1. `npm install -D @moonshot-team/google-sheets-i18n`
2. Create a `i18n.config.js` file in the folder you wish to run the translations on.
3. `npx google-sheets-i18n fetch`

## i18n Configuration

```js
var path = require("path");

module.exports = {
  categories: ["category", "subcategory", "subcategory2"],
  credentialsPath: path.join(process.cwd(), "credentials.json"),
  languages: ["en_CA", "fr_CA", "es_ES"],
  sheetId: "YOUR_SHEET_ID"
};
```

- `categories` - (required) The columns that defined the key names, for example, with the table above the first row will correspond to the `onboarding.landing.intro` key in the i18n file,
- `delimiter` - (optional, default - '.') The delimiter used to join different categories to build the i18n key,
- `credentialsPath` - (required) Absolute path to your crendentials JSON file,
- `languages`: (required) The column in the sheet defining the i18n locales, each language corresponds to a single output file,
- `sheetId` - (required) The ID of the Google Spreadsheet (can be found as part of its URL),
- `output` - (required) An absolute path to the folder where locale files are saved.
