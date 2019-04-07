// Installed packages
const cheerio = require('cheerio');

// Selectors
const LAST_PAGE_PAGINATION = '#pager > img.tip-right';

const isItLastPage = $ => $(LAST_PAGE_PAGINATION).length > 0;

const isNextPage = async webpage => {
  const $ = await cheerio.load(webpage);
  const isLastPage = await isItLastPage($);
  console.log('isLastPage', isLastPage);
  return !isLastPage;
};

module.exports = isNextPage;
