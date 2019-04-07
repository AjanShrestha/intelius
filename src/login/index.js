// Our packages
const CREDS = require('./creds');
const SELECTORS = require('./selectors');
const {helper, screenshot} = require('../utils');

const logger = require('../../logger')('LOGIN');

// CONSTANTS
const URL = 'https://iservices.intelius.com/premier/dashboard.php';

const login = async page => {
  logger.info('Start');
  await page.goto(URL);
  logger.info('Load Login Page');

  // Fill Form
  await page.click(SELECTORS.EMAIL_SELECTOR);
  await helper.timeoutPromise(100);
  await page.keyboard.type(CREDS.email);
  await helper.timeoutPromise(100);

  await page.click(SELECTORS.PASSWORD_SELECTOR);
  await page.keyboard.type(CREDS.password);

  logger.info('Login Form Filled');
  await page.click(SELECTORS.BUTTON_SELECTOR);
  logger.info('Clicked Login Button');

  // Logged In
  await page.waitForSelector(SELECTORS.LAST_NAME);
  logger.info('Search Navigation');
  await screenshot(page, 'LoggedIn');
  logger.info('End');
};

module.exports = login;
