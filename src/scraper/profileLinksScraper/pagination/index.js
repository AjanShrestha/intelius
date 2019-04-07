// Installed packages
const cheerio = require('cheerio');

// Our Packages
const SELECTORS = require('./selectors');
const {helper} = require('../../../utils');
const logger = require('../../../../logger')('PAGINATION');

const isItLastPage = $ => $(SELECTORS.LAST_PAGE_PAGINATION).length > 0;

const isNextPage = async webpage => {
  const $ = await cheerio.load(webpage);
  const isLastPage = await isItLastPage($);
  return !isLastPage;
};

const nextPage = async page => {
  logger.info('Start');
  await helper.timeoutPromise(100);
  await page.click(SELECTORS.NEXT_PAGE);
  logger.info('NextPage  Navigation');

  // Page wait
  await helper.timeoutPromise(100);
  await page.waitForSelector(SELECTORS.LAST_NAME);
  logger.info('NextPage Loaded');
  await screenshot(page, 'NextPage Results');

  const htmlContent = await page.content();
  logger.info('End');
  return htmlContent;
};

module.exports = {
  isNextPage,
  nextPage,
};
