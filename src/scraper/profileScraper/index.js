// Our Packages
const matchAddress = require('./matchAddress');
const scrapeProfile = require('./scrape');

const logger = require('../../../logger')('PROFILE_SCRAPER');

const profileScraper = async (page, link, person) => {
  logger.info('Start');
  await page.goto(link);
  logger.info('Profile Page loaded');

  const htmlContent = await page.content();
  const profile = await scrapeProfile(htmlContent);
  logger.info('Profile Scraped');

  const ADDRESS = person.Address.split(' ')[0];
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
      const nextCsvFormat = {
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phone: profile.phone.length > i ? profile.phone[i].phone : '',
        phoneState:
          profile.phone.length > i && profile.phone[i].isCurrent
            ? 'current'
            : profile.phone.length > i && profile.phone[i].isMobile
            ? 'mobile'
            : '',
        email: profile.email.length > i ? profile.email[i] : '',
      };
      return [...prev, nextCsvFormat];
    } else {
      const firstCsvFormat = {
        name: person.Name,
        address: person.Address,
        city: person.City,
        state: person.State,
        zip: person.Zip,
        phone: profile.phone.length > i ? profile.phone[i].phone : '',
        phoneState:
          profile.phone.length > i && profile.phone[i].isCurrent
            ? 'current'
            : profile.phone.length > i && profile.phone.isMobile
            ? 'mobile'
            : '',
        email:
          profile.email && profile.email.length > i ? profile.email[i] : '',
      };
      return [...prev, firstCsvFormat];
    }
  }, []);
  logger.info('End');
  return arr;
};

module.exports = profileScraper;
