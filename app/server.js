require('dotenv').config();
const config = require('./config');
const { App } = require('./app');
const { AuthProvider } = require('./authProvider');
const { routes } = require('./routes');
const { logger } = require('./logger');

Object.keys(config).map((configKey) => {
  if (config[configKey]) {
    logger.info(`${configKey} set to ${config[configKey]}`);
  } else {
    logger.error(`${configKey} not set`);
  }
});

const authProvider = new AuthProvider();
const app = new App(authProvider).createApp();

app.use('/', routes(authProvider));

// Run application on configured port
if (config.env === 'development') {
  logger.info(`Public browse - \x1b[35m${config.appBaseUri}/\x1b[0m`);
} else {
  logger.info(`App listening on port ${config.port} - Public browse`);
}
app.listen(config.port);
