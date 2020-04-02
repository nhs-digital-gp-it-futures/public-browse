require('dotenv').config();
const util = require('util');
const axios = require('axios');
const config = require('./config');
const { App } = require('./app');
const { AuthProvider } = require('./authProvider');
const { routes } = require('./routes');
const { logger } = require('./logger');

const setTimeoutPromise = util.promisify(setTimeout);

const determineAppTypeToStart = async ({
  canStartApp, appType, loginEnabled, attempt, pollDuration,
}) => {
  if (!canStartApp) {
    if (loginEnabled === 'false') {
      return determineAppTypeToStart({
        canStartApp: true, appType: 'basic', loginEnabled, attempt, pollDuration,
      });
    }

    try {
      await axios.get(`${config.oidcBaseUri}/.well-known/openid-configuration`);
      return determineAppTypeToStart({
        canStartApp: true, appType: 'auth', loginEnabled, attempt, pollDuration,
      });
    } catch (err) {
      const nextAttempt = attempt + 1;
      const nextPollDuration = nextAttempt * pollDuration;
      logger.error(`Isapi is not ready - will poll again in ${nextAttempt} seconds`);
      return setTimeoutPromise(nextPollDuration).then(async () => determineAppTypeToStart({
        canStartApp: false, appType, loginEnabled, attempt: nextAttempt, pollDuration,
      }));
    }
  }

  return appType;
};

(async () => {
  Object.keys(config).map((configKey) => {
    if (config[configKey]) {
      logger.info(`${configKey} set to ${config[configKey]}`);
    } else {
      logger.error(`${configKey} not set`);
    }
  });

  const appType = await determineAppTypeToStart({
    canStartApp: false,
    appType: undefined,
    loginEnabled: config.loginEnabled,
    attempt: 1,
    pollDuration: 1000,
  });

  const authProvider = appType === 'auth' ? new AuthProvider() : undefined;

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
