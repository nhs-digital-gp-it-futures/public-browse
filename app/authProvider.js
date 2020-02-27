// Authentication dependencies
const passport = require('passport');
const PassportStrategy = require('passport-openidconnect').Strategy;
const session = require('cookie-session');

// Fake Authentication dependencies
const cookieParser = require('cookie-parser');

export class RealAuthProvider {
  constructor() {
    this.passport = passport;
    const OIDC_BASE_URI = 'http://localhost:8070';
    const OIDC_CLIENT_ID = 'SampleClient';
    const OIDC_CLIENT_SECRET = 'SampleClientSecret';
    const OIDC_REDIRECT_URI = 'http://localhost:3000/oauth/callback';

    this.passport.use(new PassportStrategy({
      issuer: OIDC_BASE_URI,
      clientID: OIDC_CLIENT_ID,
      clientSecret: OIDC_CLIENT_SECRET,
      authorizationURL: `${OIDC_BASE_URI}/connect/authorize`,
      userInfoURL: `${OIDC_BASE_URI}/connect/userinfo`,
      tokenURL: `${OIDC_BASE_URI}/connect/token`,
      callbackURL: OIDC_REDIRECT_URI,
      passReqToCallback: true,
    },
    ((req, issuer, userId, profile, accessToken, refreshToken, params, cb) => {
      req.session.accessToken = accessToken;

      return cb(null, profile);
    })));

    this.passport.serializeUser((user, done) => {
      done(null, user);
    });

    this.passport.deserializeUser((obj, done) => {
      done(null, obj);
    });
  }

  setup(app) {
    app.use(session({
      name: 'token2',
      secret: 'secret squirrel',
    }));

    app.use(this.passport.initialize());
    app.use(this.passport.session());
  }

  authenticate(options) {
    return (req, res, next) => {
      this.passport.authenticate('openidconnect', options)(req, res, next);
    };
  }
}

export class FakeAuthProvider {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor() {}

  // eslint-disable-next-line class-methods-use-this
  setup(app) {
    app.use(cookieParser());

    app.use((req, res, next) => {
      if (req.cookies && req.cookies.fakeToken) {
        req.user = JSON.parse(req.cookies.fakeToken);
      }
      next();
    });
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  authenticate(options) {
    return (req, res) => {
      res.redirect('http://identity-server/login');
    };
  }
}
