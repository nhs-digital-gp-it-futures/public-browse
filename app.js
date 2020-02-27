// Core dependencies
const path = require('path');
const favicon = require('serve-favicon');

// External dependencies
const compression = require('compression');
const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const dateFilter = require('nunjucks-date-filter');

// Authentication dependencies
// const passport = require('passport');
// const PassportStrategy = require('passport-openidconnect').Strategy;
// const session = require('cookie-session');

// Fake Authentication dependencies
// const cookieParser = require('cookie-parser');

// Local dependencies
const config = require('./app/config');
const locals = require('./app/locals');

class App {
  constructor(authProvider) {
    // Initialise application
    this.app = express();
    this.authProvider = authProvider;
  }

  createApp() {
    // Adds favicon to every page
    this.app.use(favicon(path.join(__dirname, '/node_modules/nhsuk-frontend/packages/assets/favicons', 'favicon.ico')));

    // Use gzip compression to decrease the size of
    // the response body and increase the speed of web app
    this.app.use(compression());

    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use(express.json());

    // Middleware to serve static assets
    this.app.use(express.static(path.join(__dirname, 'public/')));
    this.app.use('/nhsuk-frontend', express.static(path.join(__dirname, '/node_modules/nhsuk-frontend/packages')));

    // View engine (Nunjucks)
    this.app.set('view engine', 'njk');

    // Use local variables
    this.app.use(locals(config));

    // Nunjucks configuration
    const appViews = [
      path.join(__dirname, 'app/views/'),
      path.join(__dirname, 'app/'),
      path.join(__dirname, 'node_modules/buying-catalogue-components/app/'),
      path.join(__dirname, 'node_modules/nhsuk-frontend/packages/'),
    ];

    const env = nunjucks.configure(appViews, {
      autoescape: true,
      express: this.app,
      noCache: true,
    });

    env.addFilter('isArray', value => Array.isArray(value));
    env.addFilter('dateTime', dateFilter);

    this.authProvider.setup(this.app);

    return this.app;
  }

  // createAppWithAuthentication() {
  //   this.app = this.createApp();

  //   const OIDC_BASE_URI = 'http://localhost:8070';
  //   const OIDC_CLIENT_ID = 'SampleClient';
  //   const OIDC_CLIENT_SECRET = 'SampleClientSecret';
  //   const OIDC_REDIRECT_URI = 'http://localhost:3000/oauth/callback';

  //   passport.use(new PassportStrategy({
  //     issuer: OIDC_BASE_URI,
  //     clientID: OIDC_CLIENT_ID,
  //     clientSecret: OIDC_CLIENT_SECRET,
  //     authorizationURL: `${OIDC_BASE_URI}/connect/authorize`,
  //     userInfoURL: `${OIDC_BASE_URI}/connect/userinfo`,
  //     tokenURL: `${OIDC_BASE_URI}/connect/token`,
  //     callbackURL: OIDC_REDIRECT_URI,
  //     passReqToCallback: true,
  //   },
  //   ((req, issuer, userId, profile, accessToken, refreshToken, params, cb) => {
  //     console.log('issuer:', issuer);
  //     console.log('userId:', userId);
  //     console.log('accessToken:', accessToken);
  //     console.log('refreshToken:', refreshToken);
  //     console.log('params:', params);

  //     req.session.accessToken = accessToken;

  //     return cb(null, profile);
  //   })));

  //   passport.serializeUser((user, done) => {
  //     console.log(`serializeUser ${JSON.stringify(user)}`);
  //     done(null, user);
  //   });

  //   passport.deserializeUser((obj, done) => {
  //     console.log(`deserializeUser ${JSON.stringify(obj)}`);
  //     done(null, obj);
  //   });

  //   this.app.use(session({
  //     name: 'token2',
  //     secret: 'secret squirrel',
  //   }));

  //   this.app.use(passport.initialize());
  //   this.app.use(passport.session());

  //   return this.app;
  // }

  // createAppWithFakeAuthentication() {
  //   this.app = this.createApp();
  //   this.app.use(cookieParser());

  //   this.app.use((req, res, next) => {
  //     if (req.cookies && req.cookies.fakeToken) {
  //       console.log('IN APP WHAT HAVE WE GOT');
  //       console.log(`req ${JSON.stringify(JSON.parse(req.cookies.fakeToken))}`);
  //       req.user = JSON.parse(req.cookies.fakeToken);
  //     }
  //     next();
  //   });

  //   return this.app;
  // }
}

module.exports = { App };
