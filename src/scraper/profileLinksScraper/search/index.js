// Our Packages
const SELECTORS = require('./selectors');
const {screenshot} = require('../../../utils');
const logger = require('../../../../logger')('SEARCH');

const getSearchInput = ({Name, City, State}) => {
  const nameSplit = Name.split(' ');
  return {
    firstName: nameSplit[0],
    lastName: nameSplit[nameSplit.length - 1],
    cityState: `${City}, ${State}`,
  };
};

// https://iservices.intelius.com/premier/search.php?componentId=1&qf=CARA&qn=NE
// TH&qcs=FORT+COLLINS%2C+CO&page=1
// https://iservices.intelius.com/premier/search.php?componentId=1&qf=CARA&qn=NET
// H&qcs=FORT%20COLLINS,%20CO&page=1
const getSearchUrl = ({firstName, lastName, cityState, pageNum}) =>
  encodeURI(
    `https://iservices.intelius.com/premier/search.php?componentId=1&qf=${firstName}&qn=${lastName}&qcs=${cityState}&page=${pageNum}`
  );

const search = async (page, personInfo, pageNum) => {
  logger.info('Start');

  const searchInfo = {
    ...getSearchInput(personInfo),
    pageNum,
  };
  logger.info(`searchInfo: ${JSON.stringify(searchInfo)}`);
  const searchUrl = await getSearchUrl(searchInfo);
  logger.info(`searchUrl: ${JSON.stringify(searchUrl)}`);
  await screenshot(page, 'Search');

  // Page wait
  await page.goto(searchUrl);
  logger.info('Result Navigation');

  // Page wait
  await page.waitForSelector(SELECTORS.LAST_NAME);
  logger.info('Result Page Loaded');
  await screenshot(page, 'Search_Results');

  const htmlContent = await page.content();
  logger.info('End');
  return htmlContent;
};

module.exports = search;
