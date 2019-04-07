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
  emptyPerson,
  rowSeparator,
  timeoutPromise,
};
