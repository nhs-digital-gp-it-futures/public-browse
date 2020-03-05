module.exports = {
  // App name
  appName: 'Buying Catalogue - Public Browse',

  // Environment
  env: process.env.NODE_ENV || 'development',

  // Port to run local development server on
  port: process.env.PORT || 3000,

  // The base uri the app is running on to pass to identity service for redirection
  appBaseUri: process.env.APP_BASE_URI || 'http://docker.for.mac.localhost:3000',

  // API_HOST
  buyingCatalogueApiHost: process.env.API_HOST || 'http://localhost:5100',

  // DOCUMENT_HOST
  documentApiHost: process.env.DOCUMENT_HOST || 'http://localhost:5101',

  // BLOBSTORE_HOST
  blobstoreHost: process.env.BLOBSTORE_HOST || 'https://gpitfuturesdevsa.blob.core.windows.net',

  // LOGGER_LEVEL options are info, warn, error, off
  loggerLevel: process.env.LOGGER_LEVEL || 'error',

  // The base uri of identity service
  oidcBaseUri: process.env.OIDC_BASE_URI || 'http://localhost:5102',

  // The client id to be sent to identity service
  oidcClientId: process.env.OIDC_CLIENT_ID || 'SampleClient',

  // The secret need to decode JWT tokens
  oidcClientSecret: process.env.OIDC_CLIENT_SECRET,
};
