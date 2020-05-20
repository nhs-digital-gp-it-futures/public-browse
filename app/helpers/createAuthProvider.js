const { AuthProvider } = require('buying-catalogue-library');
const { logger } = require('../logger');

export const createAuthProvider = ({ config }) => {
  const authProvider = new AuthProvider({
    config, scopes: 'Organisation', unauthenticatedError: undefined, logger,
  });
  return authProvider;
};
