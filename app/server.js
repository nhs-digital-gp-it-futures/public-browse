require('dotenv').config();
const browserSync = require('browser-sync'); // eslint-disable-line import/no-extraneous-dependencies
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
  app.listen(config.port - 50, () => {
    browserSync({
      files: ['./**/*.*', '../public/**/*.*'],
      notify: true,
      open: false,
      port: config.port,
      proxy: `localhost:${config.port - 50}`,
      ghostMode: false,
      ui: false,
    });
  });
} else {
  app.listen(config.port);
}
