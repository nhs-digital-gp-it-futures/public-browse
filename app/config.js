module.exports = {
  // App name
  appName: 'Buying Catalogue - Public Browse',

  // Base URL
  baseUrl: process.env.BASE_URL || '',

  // Environment
  env: process.env.NODE_ENV || 'development',

  // Port to run local development server on
  port: process.env.PORT || 3000,

  // The base uri the app is running on to pass to identity service for redirection
  appBaseUri: process.env.APP_BASE_URI || 'http://localhost:3000',

  // feedback link URL
  feedbackLinkUrl: process.env.FEEDBACK_LINK_URL || 'https://forms.office.com/Pages/ResponsePage.aspx?id=Hwf2UP67GkCIA2c3SOYp4nDHKEWnXcFHiqdJhf0fCJtUNDNFRUFZVFU5RkRQTEpWU0RQVlVXMUpRQi4u',

  // BUYING_CATALOGUE_ADMIN_HOST
  buyingCatalogueAdminHost: process.env.BUYING_CATALOGUE_ADMIN_HOST || 'http://localhost:3005/admin',

  // ORDER_FORM_HOST
  orderFormHost: process.env.ORDER_FORM_HOST || 'http://localhost:3006/order',

  // API_HOST
  buyingCatalogueApiHost: process.env.API_HOST || 'http://localhost:5100',

  // DOCUMENT_HOST
  documentApiHost: process.env.DOCUMENT_HOST || 'http://localhost:5101',

  // LOGGER_LEVEL options are info, warn, error, off
  loggerLevel: process.env.LOGGER_LEVEL || 'error',

  // IDENTITY_SERVER
  identityServerUrl: process.env.IDENTITY_SERVER || 'http://localhost:5102/identity',

  // The base uri of identity service
  oidcBaseUri: process.env.OIDC_BASE_URI || 'http://localhost:5102/identity',

  // The client id to be sent to identity service
  oidcClientId: process.env.OIDC_CLIENT_ID || 'NodeClient',

  // The secret need to decode JWT tokens
  oidcClientSecret: process.env.OIDC_CLIENT_SECRET,

  // TODO: LOGIN_ENABLED Remove line below when login is enabled by default
  // Boolean to indicate if we show the login/logout component
  loginEnabled: process.env.LOGIN_ENABLED || 'false',

  // The path that the user is redirected to after logout
  logoutRedirectPath: process.env.LOGOUT_REDIRECT_PATH || '/',

  // How long before the cookies stored in the session expire in ms (1 hour)
  maxCookieAge: process.env.MAX_COOKIE_AGE || 3600000,

  // TODO: USE_CAPABILITIES_SELECTOR Remove line below when capabilities-selector is on by default
  // Boolean to indicate if we show the capabilities selector page
  useCapabilitiesSelector: process.env.USE_CAPABILITIES_SELECTOR || 'true',

  // TODO: SHOW_ORDER_FORM Remove line below when capabilities-selector is on by default
  // Boolean to indicate if we show the order form tile
  showOrderForm: process.env.SHOW_ORDER_FORM || 'true',

  // The secret needed for encoding and decoding the cookie
  cookieSecret: process.env.COOKIE_SECRET,

  // Boolean to indicate if we show the COVID-19 feature
  showCovid19: process.env.SHOW_COVID19 || 'true',

  // The url in which redis is running
  redisUrl: process.env.REDIS_URL || 'localhost',

  // The port redis is running
  redisPort: process.env.REDIS_PORT || 6379,

  // Boolean to indicate whether to connect to redis via TLS
  redisTls: process.env.REDIS_TLS || 'false',

  // The password to connect to redis
  redisPass: process.env.REDIS_PASS,

  showDfocvc: process.env.SHOW_DFOCVC || 'true',
};
