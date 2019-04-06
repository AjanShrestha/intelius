const fs = require('fs');

const csv = require('csvtojson');
const _ = require('lodash');

const reader = (filename = 'input') =>
  csv().fromFile(`storage/${filename}.csv`);

module.exports = reader;
