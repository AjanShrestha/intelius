// Our Packages
const isNextPage = require('./pagination');
const search = require('./search');
const scrapeProfileLinks = require('./scrape');
const {helper} = require('../../utils');
const logger = require('../../../logger')('PROFILE_LINK_SCRAPER');

const profileLinksScraper = async (page, person) => {
  logger.info('Start');
  let isNext = true;
  let pageNum = 1;
  let profileLinks = [];
  while (isNext) {
    const searchHtmlContent = await search(page, person, pageNum);
    logger.info('Searched Person');
    await helper.throttle();
    const links = await scrapeProfileLinks(searchHtmlContent);
    logger.info('Scraped Profile LInk');
    profileLinks = await [...profileLinks, ...links];
    isNext = await isNextPage(searchHtmlContent);
    isNext = (await profileLinks.length) > 0 ? isNext : false;
    pageNum += 1;
    logger.info(`Next page: ${isNext}`);
  }
  logger.info('End');
  return profileLinks;
};

module.exports = profileLinksScraper;
