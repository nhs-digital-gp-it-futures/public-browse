const { createLogger, format, transports } = require('winston');
const { loggerLevel, env } = require('./config');

const {
  combine,
  timestamp,
  label,
  printf,
  colorize,
} = format;
const logFormat = printf((info) => `${info.timestamp} [${info.level}] ${info.label} | message: ${info.message} ${info.message.stack ? `: ${info.message.stack}` : ''}`);

export const logger = createLogger({
  format: combine(
    label({ label: 'public-browse' }),
    timestamp(),
    colorize(),
    logFormat,
  ),
  transports: [
    new transports.Console({
      level: loggerLevel,
      colourize: (env === 'development'),
    }),
  ],
});
