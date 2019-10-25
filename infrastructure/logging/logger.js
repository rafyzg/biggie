const winston = require('winston');
const { format } = require('logform');

const biggieLogFormat = format.combine(
    format.timestamp(),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

const logLevels = {
    levels: {
        emerg: 0, //Most urgent
        error: 1,
        warn: 2,
        debug: 3,
        info: 4
    }
};

const logger = winston.createLogger({
    levels: logLevels.levels,
    format : biggieLogFormat,
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: '../logs/emergency.log', level: 'emerg' }),
        new winston.transports.File({ filename: '../logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: '../logs/combinedlogs.log' })
    ]
});

// If we're not in production then log to the `console`
/*if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple()
    }));
  }*/

module.exports = {
    logger
}
