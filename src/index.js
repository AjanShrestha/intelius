require('dotenv').config();

// Our Packages
const login = require('./login');
const main = require('./main');
const {WebGateway} = require('./utils');
// logger
const logger = require('../logger')('APP');

if (require.main === module) {
  logger.info('Starting App');
  (async () => {
    logger.info('Starting Main function');
    try {
      browser = await WebGateway.browser();
      const page = await WebGateway.page(browser);
      await login(page);
      await main(page);
    } catch (e) {
      console.error(e);
    } finally {
      logger.info('Ending Main function');
      await browser.close().then(() => process.exit(0));
    }
  })();
  logger.info('Ending App');
}
