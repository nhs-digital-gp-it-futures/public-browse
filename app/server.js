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

  let isapiReady = false;

  setInterval(async () => {
    if (isapiReady) {
      return;
    }

    console.log('about to check if Isapi is ready');

    try {
      console.log('about to check if Isapi is ready');
      await axios.get('http://localhost:5102/identity/.well-known/openid-configuration');
      console.log('Isapi is ready');
      isapiReady = true;
    } catch (err) {
      console.log('Isapi is not ready');
      isapiReady = false;
    }
  }, 1000);


  console.log('isapiReady', isapiReady);

  const loginReady = config.loginEnabled === 'true' && isapiReady;
  console.log('loginReady', loginReady);


  const authProvider = new AuthProvider();
  const app = new App(authProvider, loginReady).createApp();

  app.use(config.baseUrl ? config.baseUrl : '/', routes(authProvider, loginReady));
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
