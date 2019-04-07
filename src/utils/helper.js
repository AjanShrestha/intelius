// System packages
const fs = require('fs');

// Installed packages
const _ = require('lodash');

// Our Packages
const reader = require('./reader');

const isSearchable = obj => {
  const ADDRESS = reader.yaml().XLSX.ADDRESS;
  const CITY = reader.yaml().XLSX.CITY;
  const STATE = reader.yaml().XLSX.STATE;
  return !(
    _.isEmpty(obj[ADDRESS]) ||
    _.isEmpty(obj[CITY]) ||
    _.isEmpty(obj[STATE])
  );
};

const timeoutPromise = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const backupFile = async fileName => {
  const FILENAME = `storage/${fileName}`;
  if (fs.existsSync(FILENAME)) {
    const COPY_FILENAME = `storage/${fileName}.${Date.now()}.bak`;
    fs.copyFileSync(FILENAME, COPY_FILENAME);
    fs.unlinkSync(FILENAME);
  }
};

const keys = reader.yaml().XLSX.FINAL_FIELDNAMES;
const rowSeparator = [
  keys.reduce(
    (prev, next) => ({
      ...prev,
      [next]: '**',
    }),
    {}
  ),
];
const emptyPerson = keys.reduce(
  (prev, next) => ({
    ...prev,
    [next]: '',
  }),
  {}
);

module.exports = {
  isSearchable,
  backupFile,
  emptyPerson,
  rowSeparator,
  timeoutPromise,
};
