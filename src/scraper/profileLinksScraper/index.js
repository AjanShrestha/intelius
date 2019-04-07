// Our Packages
const {isNextPage, nextPage} = require('./pagination');
const search = require('./search');
const scrapeProfileLinks = require('./scrape');
const {helper} = require('../../utils');
const logger = require('../../../logger')('PROFILE_LINK_SCRAPER');

const profileLinksScraper = async (page, person) => {
  logger.info('Start');
  let isNext = false;
  let profileLinks = [];
  let searchHtmlContent = await search(page, person);
  logger.info('Searched Person');
  do {
    await helper.throttle();
    if (isNext) {
      searchHtmlContent = await nextPage(page);
    }
    const links = await scrapeProfileLinks(searchHtmlContent);
    logger.info('Scraped Profile LInk');
    profileLinks = await [...profileLinks, ...links];
    isNext = await isNextPage(searchHtmlContent);
    isNext = (await profileLinks.length) > 0 ? isNext : false;
    logger.info(`Next page: ${isNext}`);
  } while (isNext);
  logger.info('End');
  return profileLinks;
};

module.exports = profileLinksScraper;
