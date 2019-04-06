const getMatchStr = str => str.split(' ').slice(0, 2).join(' ');

const matchAddress = (addresses, matchingAddress) => {
  const matchStr = getMatchStr(matchingAddress);
  const regexStr = new RegExp(`${matchStr}`, 'gi');
  const matches = addresses.map(str => str.match(regexStr) !== null);
  return matches.includes(true);
};

module.exports = matchAddress;