// Installed Packages
const puppeteer = require('puppeteer');

// Our Packages
const BrowserLogger = require('../../logger')('BROWSER');
const PageLogger = require('../../logger')('PAGE');

const browser = async () => {
  BrowserLogger.info('Start');
  const browser = await puppeteer.launch({
    headless: process.env.NODE_ENV !== 'debug',
    args: ['--start-fullscreen', '--incognito'],
  });
  BrowserLogger.info('Puppeteer launch');
  BrowserLogger.info('End');
  return browser;
};

const page = async browser => {
  PageLogger.info('Start');
  const page = await browser.newPage();
  PageLogger.info('New page');
  page.setDefaultNavigationTimeout(60 * 1000);
  page.setJavaScriptEnabled(true);
  PageLogger.info('End');
  return page;
};

module.exports = {
  browser,
  page,
};
