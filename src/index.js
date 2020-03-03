#!/usr/bin/env node

const program = require("commander");

const packageJSON = require("../package.json");

program
  .version(packageJSON.version)
  .usage("<command>")
  .option("fetch", "Generate translations")
  .option("sheets", "List available sheets")
  .parse(process.argv);

if (program.fetch) {
  const fetch = require("./fetch");
  fetch();
}

if (program.sheets) {
  const sheets = require("./sheets");
  sheets();
}
