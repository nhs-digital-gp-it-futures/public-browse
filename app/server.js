require('dotenv').config();
const { ConfigHelper } = require('buying-catalogue-library');
const config = require('./config');
const { App } = require('./app');
const { routes } = require('./routes');
const { logger } = require('./logger');
const { isIdentityReady } = require('./helpers/isIdentityReady');
const { createAuthProvider } = require('./helpers/createAuthProvider');

(async () => {
  Object.keys(config).map((configKey) => {
    if (config[configKey]) {
      const value = ConfigHelper.getConfigKeyValue(configKey, config[configKey]);
      logger.info(`${configKey} set to ${value}`);
    } else {
      logger.error(`${configKey} not set`);
    }
  });

  const appType = config.loginEnabled === 'true' && await isIdentityReady() ? 'auth' : 'basic';

  const authProvider = appType === 'auth' ? createAuthProvider({ config }) : undefined;
  const app = new App(authProvider).createApp();

  app.use(config.baseUrl ? config.baseUrl : '/', routes(authProvider));
  if (config.baseUrl) {
    app.use('/', (req, res) => {
      res.redirect(config.baseUrl);
    });
  }

  // Run application on configured port
  if (config.env === 'development') {
    logger.info(`Public browse - \x1b[35m${config.appBaseUri}${config.baseUrl}/\x1b[0m`);
  } else {
    logger.info(`App listening on port ${config.port} - Public browse`);
  }
  app.listen(config.port);
})();
