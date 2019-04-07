// Installed packages
const Promise = require('bluebird');

// Our Packages
const {profileLinksScraper, profileScraper} = require('./scraper');
const {helper, reader, writer} = require('./utils');
// logger
const logger = require('../logger')('MAIN');

const main = async page =>
  reader.xlsx('input').then(persons =>
    Promise.each(persons, async person => {
      if (!helper.isSearchable(person)) {
        logger.info(`Not Searchable Person: ${JSON.stringify(person)}`);
      } else {
        const profileLinks = await profileLinksScraper(page, person);
        logger.info(`profileLinks: ${profileLinks.length}`);
        let matched = false;
        for (const link of profileLinks) {
          const arr = await profileScraper(page, link, person);
          await helper.throttle();
          if (arr.length > 0) {
            matched = true;
            await writer.json(arr, 'tempData');
          }
        }
        if (matched) {
          await writer.json(helper.rowSeparator, 'tempData');
        }
      }
    }).then(async () => {
      const jsonData = await reader.json('tempData');
      await writer.xlsx(jsonData);
      logger.info('COMPLETED!!!');
    })
  );

module.exports = main;
