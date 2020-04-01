require('dotenv').config();
const axios = require('axios');
const config = require('./config');
const { App } = require('./app');

const { AuthProvider } = require('./authProvider');
const { routes } = require('./routes');
const { logger } = require('./logger');

(async () => {
  Object.keys(config).map((configKey) => {
    if (config[configKey]) {
      logger.info(`${configKey} set to ${config[configKey]}`);
    } else {
      logger.error(`${configKey} not set`);
    }
  });

  let intervalId;
  let app;
  const pollDuration = 1000;

  // eslint-disable-next-line consistent-return
  const startApp = async () => {
    if (app) {
      return clearInterval(intervalId);
    }

    try {
      let authProvider;

      if (config.loginEnabled === 'true') {
        await axios.get(`${config.oidcBaseUri}/.well-known/openid-configuration`);
        authProvider = new AuthProvider();
      }

      app = new App(authProvider).createApp();

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
    } catch (err) {
      logger.error(`Isapi is not ready - will poll again in ${pollDuration / 1000} seconds`);
    }
  };

  intervalId = await setInterval(startApp, pollDuration);
})();
