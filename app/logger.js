const { createLogger, format, transports } = require('winston');

const logFormat = format.printf(({
  level,
  message,
  label,
  timestamp,
}) => `${timestamp} [${label}] ${level}: ${message}`);

const logger = createLogger({
  level: 'info',
  format: logFormat,
  defaultMeta: { service: 'user-service' },
});

if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  logger.add(new transports.Console({
    format: format.combine(
      format.label({ label: 'public-browse' }),
      format.timestamp({ format: 'D/M/YY HH:mm:ss' }),
      format.colorize(),
      logFormat,
    ),
  }));
} else {
  logger.add(
    new transports.File({ filename: 'error.log', level: 'error', format: logFormat }),
    new transports.File({ filename: 'combined.log', format: logFormat }),
  );
}

export default {
  info: message => logger.log('info', message),
  warn: message => logger.log('warn', message),
  error: message => logger.log('error', message),
};
