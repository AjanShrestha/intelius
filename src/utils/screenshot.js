const logger = require('../../logger')('SCREENSHOT');

const screenshot = async (page, filename) => {
  if (['development', 'debug'].includes(process.env.NODE_ENV)) {
    logger.info('Start Screenshot');
    const finalFilename = await `${filename
      .split(' ')
      .join('_')}_${Date.now()}`;
    await page.screenshot({
      path: `screenshots/${finalFilename}.png`,
    });
    logger.info('End Screenshot');
  }
};

module.exports = screenshot;
