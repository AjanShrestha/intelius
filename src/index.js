// Our Packages
const {
  screenshot,
  WebGateway,
} = require('./utils');
const logger = require('../logger');

// Constants
const APP_LABEL = 'APP';
const MAIN_LABEL = 'MAIN';

const AppLogger = logger(APP_LABEL);
const MainLogger = logger(MAIN_LABEL);

if (require.main === module) {
  AppLogger.info('Starting App');
  (async () => {
    MainLogger.info('Starting Main function');
    try {
      browser = await WebGateway.browser();
      const page = await WebGateway.page(browser);
      MainLogger.info('Visiting Google')
      await page.goto('https://www.google.com/');
      MainLogger.info('Taking Screenshot');
      await screenshot(page, 'Google');
    } catch (e) {
      console.error(e);
    } finally {
      await browser.close();
      MainLogger.info('Ending Main function');
    }
  })();
  AppLogger.info('Ending App');
}