const browserSync = require('browser-sync');
const config = require('./app/config');
const { App } = require('./app');
const { RealAuthProvider } = require('./app/authProvider');
const { routes } = require('./app/routes');

const authProvider = new RealAuthProvider();
const app = new App(authProvider).createApp();

app.use('/', routes(authProvider));

// Run application on configured port
if (config.env === 'development') {
  app.listen(config.port - 50, () => {
    browserSync({
      files: ['app/**/*.*', 'public/**/*.*'],
      notify: true,
      open: false,
      port: config.port,
      proxy: `localhost:${config.port - 50}`,
      ui: false,
    });
  });
} else {
  app.listen(config.port);
}
