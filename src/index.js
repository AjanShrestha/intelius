require('dotenv').config();

// Installed packages
const Promise = require('bluebird');

// Our Packages
const login = require('./login');
const {profileLinksScraper} = require('./scraper');
const {helper, Reader, screenshot, WebGateway} = require('./utils');
const logger = require('../logger');

// Constants
const APP_LABEL = 'APP';
const MAIN_LABEL = 'MAIN';

const AppLogger = logger(APP_LABEL);
const MainLogger = logger(MAIN_LABEL);

const main = async page =>
  Reader().then(persons =>
    Promise.each(persons, async person => {
      if (!helper.isSearchable(person)) {
        MainLogger.info(`Person: ${person}`);
      } else {
        const profileLinks = await profileLinksScraper(page, person);
        MainLogger.info(`profileLinks: ${profileLinks.length}`);
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
