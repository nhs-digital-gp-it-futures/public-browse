// Authentication dependencies
const passport = require('passport');
const PassportStrategy = require('passport-openidconnect').Strategy;
const session = require('cookie-session');

// Fake Authentication dependencies
const cookieParser = require('cookie-parser');

export class RealAuthProvider {
  constructor() {
    const OIDC_BASE_URI = 'http://localhost:8070';
    const OIDC_CLIENT_ID = 'SampleClient';
    const OIDC_CLIENT_SECRET = 'SampleClientSecret';
    const OIDC_REDIRECT_URI = 'http://localhost:3000/oauth/callback';

    passport.use(new PassportStrategy({
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
      console.log('issuer:', issuer);
      console.log('userId:', userId);
      console.log('accessToken:', accessToken);
      console.log('refreshToken:', refreshToken);
      console.log('params:', params);

      req.session.accessToken = accessToken;

      return cb(null, profile);
    })));

    passport.serializeUser((user, done) => {
      console.log(`serializeUser ${JSON.stringify(user)}`);
      done(null, user);
    });

    passport.deserializeUser((obj, done) => {
      console.log(`deserializeUser ${JSON.stringify(obj)}`);
      done(null, obj);
    });
  }

  setup(app) {
    app.use(session({
      name: 'token2',
      secret: 'secret squirrel',
    }));

    app.use(passport.initialize());
    app.use(passport.session());
  }

}

export class FakeAuthProvider {
  constructor() {
    console.log('Createing a Fakey fake');
  }

  setup(app) {
    app.use(cookieParser());

    app.use((req, res, next) => {
      if (req.cookies && req.cookies.fakeToken) {
        console.log('IN APP WHAT HAVE WE GOT');
        console.log(`req ${JSON.stringify(JSON.parse(req.cookies.fakeToken))}`);
        req.user = JSON.parse(req.cookies.fakeToken);
      }
      next();
    });
  }
}
