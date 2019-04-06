// Installed packages
const cheerio = require('cheerio');

// Our Packages
const scrape = require('./scrape');

const scrapeProfileLinks = async webpage => {
  const $ = await cheerio.load(webpage);
  const links = await scrape($);
  return links;
};

module.exports = scrapeProfileLinks;
