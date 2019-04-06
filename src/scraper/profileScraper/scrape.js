// Installed packages
const cheerio = require('cheerio');

// Our Packages
const profile = require('./profile');
const matchAddress = require('./matchAddress');

const scrapeProfile = async webpage => {
  const $ = await cheerio.load(webpage);
  const personProfile = await profile($);
  return personProfile;
};

module.exports = scrapeProfile;
