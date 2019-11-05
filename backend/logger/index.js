const winston = require('winston');
const { format } = winston;
const moment = require('moment');

const logFormat = format.printf(({ level, module, name, message, timestamp }) => {
  return `${timestamp} [${level}][${module}] ${name}: ${message}`;
});

const logger = winston.createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    logFormat,
  ),
  defaultMeta: { service: 'Mirror API' },
  transports: [
    new winston.transports.File({ filename: `./logger/log/${moment().format('YYYY.MM.DD')}.log`, level: 'error' }),
  ]
});

module.exports.logErrorGlobal = function (err, req, res, next) {
    if (err) {
      err.module = 'Global';
      logger.error(err);
      res.status(500).send("Internal server error. Try again later.");
    }
    next();
}

module.exports.logError = function (module, err) {
    err.module = module;
    logger.error(err);
}
