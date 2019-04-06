const log4js = require('log4js');

const developmentAppenders = {
  console: {
    type: 'console',
  },
  dev: {
    type: 'file',
    filename: './logs/debug.log',
    layout: {
      type: 'pattern',
      pattern: "[%d{yyyy-MM-dd hh:mm:ss}] [%-5p] [%c] - %m",
    },
    maxLogSize: 5242880, // 5MB
    backups: 3
  }

};

const productionAppenders = {
  app: {
    type: 'file',
    filename: './logs/app.log',
    layout: {
      type: 'pattern',
      pattern: "[%d{yyyy-MM-dd hh:mm:ss}] [%-5p] [%c]- %m",
    },
    maxLogSize: 10485760,
    backups: 10,
    keepFileExt: true,
    compress: true
  },
  emergencies: {
    type: 'file',
    filename: './logs/error.log',
    layout: {
      type: 'pattern',
      pattern: "[%d{yyyy-MM-dd hh:mm:ss}] [%-5p] [%c]- %m",
    },
    maxLogSize: 10485760, // 10MB
    backups: 5,
    keepFileExt: true,
    compress: true
  },
  'just-errors': {
    type: 'logLevelFilter',
    appender: 'emergencies',
    level: 'error'
  }
};

const logger = (LABEL) => {
  if (process.env.NODE_ENV === 'development') {
    log4js.configure({
      appenders: developmentAppenders,
      categories: {
        default: {
          appenders: ['dev', 'console'],
          level: 'debug'
        },
      }
    });
    return log4js.getLogger(LABEL);
  }
  log4js.configure({
    appenders: productionAppenders,
    categories: {
      default: {
        appenders: ['just-errors', 'app'],
        level: 'info'
      },
    }
  });
  return log4js.getLogger(LABEL);
}

module.exports = logger;