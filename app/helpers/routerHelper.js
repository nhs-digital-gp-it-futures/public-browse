import { ErrorContext } from 'buying-catalogue-library';

export const withCatch = route => async (req, res, next) => {
  try {
    return await route(req, res, next);
  } catch (err) {
    const newError = new ErrorContext({
      status: 500,
    });
    return next(newError);
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
      endpoint: `${config.buyingCatalogueApiHost}/health/ready`,
      critical: true,
    },
    {
      name: 'Document API',
      endpoint: `${config.documentApiHost}/health/ready`,
    },
  ];

  if (config.loginEnabled === 'true') {
    const isapiDependency = {
      name: 'Identity Server',
      endpoint: `${config.oidcBaseUri}/health/ready`,
      critical: true,
    };

    dependencies.push(isapiDependency);
  }

  return dependencies;
};
