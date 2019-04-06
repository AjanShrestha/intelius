const _ = require('lodash');

const isSearchable = obj =>
  !(_.isEmpty(obj.Address) || _.isEmpty(obj.City) || _.isEmpty(obj.State));

const timeoutPromise = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

module.exports = {
  isSearchable,
  timeoutPromise,
};
