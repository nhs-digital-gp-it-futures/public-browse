import { ErrorContext } from 'buying-catalogue-library';
import { getEndpoint } from '../endpoints';

export const withCatch = (logger, route) => async (req, res, next) => {
  try {
    return await route(req, res, next);
  } catch (err) {
    if (err instanceof ErrorContext) {
      return next(err);
    }

    logger.error(`Unexpected Error:\n${err.stack}`);

    const responseData = err.response ? err.response.data : undefined;
    const defaultError = new ErrorContext({
      status: 500,
      stackTrace: err.stack,
      data: responseData,
    });

    return next(defaultError);
  }
};

export const getCapabilitiesParam = (capabilities) => {
  let capabilitiesSelected = capabilities;
  if (!capabilitiesSelected || capabilitiesSelected.length < 1) capabilitiesSelected = 'all';
  if (!Array.isArray(capabilitiesSelected)) capabilitiesSelected = [capabilitiesSelected];
  return `.${capabilitiesSelected.join('+')}`;
};

export const determineContentType = (documentName) => {
  const documentNameSplit = documentName.split('.');
  const documentType = documentNameSplit[documentNameSplit.length - 1];
  return `application/${documentType}`;
};

export const getHealthCheckDependencies = (config) => {
  const dependencies = [
    {
      name: 'Buying Catalogue API',
      endpoint: getEndpoint({ endpointLocator: 'getBuyingCatalogueApiHealth' }),
      critical: true,
    },
    {
      name: 'Document API',
      endpoint: getEndpoint({ endpointLocator: 'getDocumentApiHealth' }),
    },
  ];

  if (config.loginEnabled === 'true') {
    const isapiDependency = {
      name: 'Identity Server',
      endpoint: getEndpoint({ endpointLocator: 'getIdentityApiHealth' }),
      critical: true,
    };

    dependencies.push(isapiDependency);
  }

  return dependencies;
};
