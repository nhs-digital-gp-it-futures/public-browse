module.exports = {
  // App name
  appName: 'Buying Catalogue - Public Browse',

  // Environment
  env: process.env.NODE_ENV || 'development',

  // Port to run local development server on
  port: process.env.PORT || 3000,

  // API_HOST
  apiHost: process.env.API_HOST || 'http://localhost:5100',

  // DOCUMENT_HOST
  documentHost: process.env.DOCUMENT_HOST || 'http://localhost:5101',

  // BLOBSTORE_HOST
  blobstoreHost: process.env.BLOBSTORE_HOST || 'https://gpitfuturesdevsa.blob.core.windows.net',

  // LOGGER_LEVEL options are info, warn, error, off
  loggerLevel: process.env.LOGGER_LEVEL || 'error',
};
