// Our Packages
const SELECTORS = require('./selectors');
const {helper, reader, screenshot} = require('../../../utils');
const logger = require('../../../../logger')('SEARCH');

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
  await helper.timeoutPromise(300);
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
