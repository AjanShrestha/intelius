require('dotenv').config();

// Installed packages
const Promise = require('bluebird');

// Our Packages
const login = require('./login');
const {profileLinksScraper, profileScraper} = require('./scraper');
const {helper, Reader, screenshot, WebGateway, Writer} = require('./utils');
const logger = require('../logger');
// loggers
const AppLogger = logger('APP');
const MainLogger = logger('MAIN');

const main = async page =>
  Reader().then(persons =>
    Promise.each(persons, async person => {
      if (!helper.isSearchable(person)) {
        MainLogger.info(`Person: ${person}`);
      } else {
        const profileLinks = await profileLinksScraper(page, person);
        MainLogger.info(`profileLinks: ${profileLinks.length}`);
        for (const link of profileLinks) {
          const arr = await profileScraper(page, link, person);
          await Writer.writeRecords(arr);
        }
      }
    }).then(() => {
      MainLogger.info('COMPLETED!!!');
    })
  );

if (require.main === module) {
  AppLogger.info('Starting App');
  (async () => {
    MainLogger.info('Starting Main function');
    try {
      browser = await WebGateway.browser();
      const page = await WebGateway.page(browser);
      await login(page);
      await main(page);
    } catch (e) {
      console.error(e);
    } finally {
      MainLogger.info('Ending Main function');
      await browser.close().then(() => process.exit(0));
    }
  })();
  AppLogger.info('Ending App');
}
