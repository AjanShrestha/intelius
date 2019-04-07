require('dotenv').config();

// Our Packages
const login = require('./login');
const main = require('./main');
const {helper, WebGateway} = require('./utils');
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
      await helper.backupFile('tempData.json');
      await helper.backupFile('out.xlsx');
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
