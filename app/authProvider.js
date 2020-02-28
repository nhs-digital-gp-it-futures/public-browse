const passport = require('passport');
const PassportStrategy = require('passport-openidconnect').Strategy;
const session = require('cookie-session');

export class AuthProvider {
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
