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

  const a = async () => {
    if (app) {
      return clearInterval(intervalId);
    }

    try {
      let authProvider;

      if (config.loginEnabled === 'true') {
        await axios.get('http://localhost:8070/identity/.well-known/openid-configuration')
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
      console.log('Isapi is not ready');
    }
  };

  intervalId = await setInterval(a, 1000);
})();
