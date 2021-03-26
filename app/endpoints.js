import { buyingCatalogueApiHost, documentApiHost, identityServerUrl } from './config';

const getSolutionListDataEndpoint = (apiHostUrl, filterType) => {
  const defaultUrl = `${apiHostUrl}/api/v1/Solutions`;
  let url;

  switch (filterType.toLowerCase()) {
    case 'all':
      url = defaultUrl;
      break;

    case 'foundation':
      url = `${defaultUrl}/Foundation`;
      break;

    case 'nhsdgp001':
    case 'dfocvc001':
      url = `${defaultUrl}?frameworkId=${filterType}`;
      break;

    default: url = undefined;
  }

  return url;
};

const endpoints = {
  // GET endpoints
  getBuyingCatalogueApiHealth: () => `${buyingCatalogueApiHost}/health/ready`,
  getDocumentApiHealth: () => `${documentApiHost}/health/ready`,
  getIdentityApiHealth: () => `${identityServerUrl}/health/ready`,
  getSolutionListData:
    (options) => getSolutionListDataEndpoint(buyingCatalogueApiHost, options.filterType),
  getPublicSolutionById: (options) => `${buyingCatalogueApiHost}/api/v1/Solutions/${options.solutionId}/Public`,
  getCapabilities: () => `${buyingCatalogueApiHost}/api/v1/Capabilities`,
  // GET Documents endpoint
  getSolutionDocument: (options) => `${documentApiHost}/api/v1/Solutions/${options.solutionId}/documents/${options.documentName}`,
  getDocument: (options) => `${documentApiHost}/api/v1/documents/${options.documentName}`,
  // POST endpoints
  postSelectedCapabilities: () => `${buyingCatalogueApiHost}/api/v1/Solutions`,
};

export const getEndpoint = ({ endpointLocator, options }) => endpoints[endpointLocator](options);
