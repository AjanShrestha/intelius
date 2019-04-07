// Our Packages
const SELECTORS = require('./selectors');
const {helper, reader, screenshot} = require('../../../utils');
const logger = require('../../../../logger')('SEARCH');

const clearAndFillInput = page => async (SELECTOR, TEXT) => {
  await page.click(SELECTOR, {
    clickCount: 3,
  });
  await helper.timeoutPromise(100);
  await page.keyboard.press('Backspace');
  await helper.timeoutPromise(100);
  await page.keyboard.type(TEXT);
};

const getSearchInput = props => {
  const NAME = reader.yaml().XLSX.NAME;
  const CITY = reader.yaml().XLSX.CITY;
  const STATE = reader.yaml().XLSX.STATE;
  const nameSplit = props[NAME].split(' ');
  return {
    firstName: nameSplit[0],
    lastName:
      nameSplit.length > 3
        ? nameSplit[nameSplit.length - 2]
        : nameSplit[nameSplit.length - 1],
    cityState: `${props[CITY]}, ${props[STATE]}`,
  };
};

const search = async (page, personInfo) => {
  logger.info('Start');

  // Fill Form
  const ENTRY = getSearchInput(personInfo);
  const fillInput = clearAndFillInput(page);
  await helper.timeoutPromise(100);
  await fillInput(SELECTORS.FIRST_NAME, ENTRY.firstName);
  await helper.timeoutPromise(100);
  await fillInput(SELECTORS.LAST_NAME, ENTRY.lastName);
  await helper.timeoutPromise(100);
  await fillInput(SELECTORS.CITY_STATE, ENTRY.cityState);
  logger.info('search form filled');
  await screenshot(page, 'Search Form Filled');

  // Page wait
  await helper.timeoutPromise(300);
  await page.click(SELECTORS.SEARCH_BUTTON_SELECTOR);
  logger.info('Result Navigation');

  // Page wait
  await helper.timeoutPromise(100);
  await page.waitForSelector(SELECTORS.LAST_NAME);
  logger.info('Result Page Loaded');
  await screenshot(page, 'Search_Results');

  const htmlContent = await page.content();
  logger.info('End');
  return htmlContent;
};

module.exports = search;
