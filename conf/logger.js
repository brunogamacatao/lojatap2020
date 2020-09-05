const winston = require('winston');

winston.level = process.env.LOGGER_LEVEL;

const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.File({
      level: 'warn',
      filename: 'logs/erros.log'
    }),
    new winston.transports.File({
      filename: 'logs/saida.log'
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console());
}

module.exports = logger;