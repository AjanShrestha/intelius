// System Packages
const fs = require('fs');

// Installed Packages
const csv = require('csvtojson');
const jsonfile = require('jsonfile');
const XLSX = require('xlsx');
const yaml = require('js-yaml');
const _ = require('lodash');

const reader = {
  csv: (filename = 'input') => csv().fromFile(`storage/${filename}.csv`),
  json: async (filename = 'tempData') =>
    jsonfile.readFileSync(`storage/${filename}.json`),
  xlsx: async (filename = 'input') =>
    Promise.resolve().then(() => {
      const workbook = XLSX.readFile(`storage/${filename}.xlsx`, {
        dateNF: 'dd/mm/yyyy',
        cellDates: true,
      });
      const sheet_name_list = workbook.SheetNames;
      return XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    }),
  yaml: (filename = 'config') =>
    yaml.safeLoad(fs.readFileSync(`config/${filename}.yml`, 'utf8')),
};

module.exports = reader;
