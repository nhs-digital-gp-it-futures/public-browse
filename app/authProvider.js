import passport from 'passport';
import PassportClient from 'passport-openidconnect';
import session from 'cookie-session';
import config from './config';

export class AuthProvider {
  constructor() {
    this.passport = passport;

    this.passport.use(new PassportClient.Strategy({
      issuer: config.oidcBaseUri,
      clientID: config.oidcClientId,
      clientSecret: config.oidcClientSecret,
      authorizationURL: `${config.oidcBaseUri}/connect/authorize`,
      userInfoURL: `${config.oidcBaseUri}/connect/userinfo`,
      tokenURL: `${config.oidcBaseUri}/connect/token`,
      callbackURL: `${config.apBaseUri}/oauth/callback`,
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
