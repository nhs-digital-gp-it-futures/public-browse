// Core dependencies
const path = require('path');

// External dependencies
const compression = require('compression');
const express = require('express');
const nunjucks = require('nunjucks');

// Local dependencies
const config = require('./app/config');
const locals = require('./app/locals');

class App {
  constructor() {

  }

  createApp() {
    // Initialise application
    const app = express();
  
    // Use gzip compression to decrease the size of
    // the response body and increase the speed of web app
    app.use(compression());

    app.use(express.urlencoded());

    app.use(express.json());
  
    // Middleware to serve static assets
    app.use(express.static(path.join(__dirname, 'public/')));
    app.use('/nhsuk-frontend', express.static(path.join(__dirname, '/node_modules/nhsuk-frontend/packages')));
  
    // View engine (Nunjucks)
    app.set('view engine', 'njk');
  
    // Use local variables
    app.use(locals(config));
  
    // Nunjucks configuration
    const appViews = [
      path.join(__dirname, 'app/views/'),
      path.join(__dirname, 'node_modules/nhsuk-frontend/packages/'),
    ];
  
    const env = nunjucks.configure(appViews, {
      autoescape: true,
      express: app,
      noCache: true,
    });
  
    env.addFilter('isArray', value => Array.isArray(value))
  
    return app
  }
}

module.exports = { App };
