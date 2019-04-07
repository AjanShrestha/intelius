// Our Packages
const matchAddress = require('./matchAddress');
const scrapeProfile = require('./scrape');
const {helper, reader} = require('../../utils');
// logger
const logger = require('../../../logger')('PROFILE_SCRAPER');

const profileScraper = async (page, link, person) => {
  logger.info('Start');
  await page.goto(link);
  logger.info('Profile Page loaded');

  const htmlContent = await page.content();
  const profile = await scrapeProfile(htmlContent);
  logger.info('Profile Scraped');

  const addressKey = reader.yaml().XLSX.ADDRESS;
  const ADDRESS = person[addressKey].split(' ')[0];
  if (!matchAddress(profile.address, ADDRESS)) {
    return [];
    logger.info('End');
  }

  logger.info('Matching Address Found');
  logger.info(`personProfile: ${JSON.stringify(profile)}`);
  const maxloop = Math.max(profile.email.length, profile.phone.length);
  logger.info(`maxloop: ${maxloop}`);
  const arr = Array.from(Array(maxloop).keys()).reduce((prev, i) => {
    if (i) {
      const nextJsonFormat = {
        ...helper.emptyPerson,
        Phone: profile.phone.length > i ? profile.phone[i].phone : '',
        PhoneState:
          profile.phone.length > i && profile.phone[i].isCurrent
            ? 'current'
            : profile.phone.length > i && profile.phone[i].isMobile
            ? 'mobile'
            : '',
        Email: profile.email.length > i ? profile.email[i] : '',
      };
      return [...prev, nextJsonFormat];
    } else {
      const firstJsonFormat = {
        ...person,
        Phone: profile.phone.length > i ? profile.phone[i].phone : 'none',
        PhoneState:
          profile.phone.length > i && profile.phone[i].isCurrent
            ? 'current'
            : profile.phone.length > i && profile.phone.isMobile
            ? 'mobile'
            : '',
        Email:
          profile.email && profile.email.length > i ? profile.email[i] : 'none',
      };
      return [...prev, firstJsonFormat];
    }
  }, []);
  logger.info('End');
  return arr;
};

module.exports = profileScraper;
