const logger = require('../../logger')('SCREENSHOT');

const screenshot = async (page, filename) => {
  if (process.env.NODE_ENV === 'development') {
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
