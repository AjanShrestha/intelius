// Our Packages
const logger = require('../logger');

// Constants
const APP_LABEL = 'APP';
const MAIN_LABEL = 'MAIN';

const AppLogger = logger(APP_LABEL);
const MainLogger = logger(MAIN_LABEL);

if (require.main === module) {
  AppLogger.info('Starting App');
  MainLogger.info('Starting Main function');
  MainLogger.info('Ending Main function');
  AppLogger.info('Ending App');
}