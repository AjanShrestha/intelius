// Installed packages
const Promise = require('bluebird');

// Our Packages
const {profileLinksScraper, profileScraper} = require('./scraper');
const {helper, Reader, Writer} = require('./utils');
// logger
const logger = require('../logger')('MAIN');

const main = async page =>
  Reader().then(persons =>
    Promise.each(persons, async person => {
      if (!helper.isSearchable(person)) {
        logger.info(`Person: ${person}`);
      } else {
        const profileLinks = await profileLinksScraper(page, person);
        logger.info(`profileLinks: ${profileLinks.length}`);
        for (const link of profileLinks) {
          const arr = await profileScraper(page, link, person);
          await Writer.writeRecords(arr);
        }
      }
    }).then(() => {
      logger.info('COMPLETED!!!');
    })
  );

module.exports = main;
