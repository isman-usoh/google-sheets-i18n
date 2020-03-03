#!/usr/bin/env node

const program = require("commander");
const fetch = require("./fetch");
const sheets = require("./sheets");

const packageJSON = require("../package.json");

program
  .version(packageJSON.version)
  .usage("<command>")
  .option("fetch", "Generate translations")
  .option("sheets", "List available sheets")
  .parse(process.argv);

if (program.fetch) {
  fetch();
}

if (program.sheets) {
  sheets();
}
