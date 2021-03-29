import { buyingCatalogueApiHost, documentApiHost, identityServerUrl } from './config';

const getSolutionListDataEndpoint = (apiHostUrl, filterType) => {
  const defaultUrl = `${apiHostUrl}/api/v1/Solutions`;

  switch (filterType.toLowerCase()) {
    case 'all':
      return defaultUrl;
    case 'foundation':
      return `${defaultUrl}/Foundation`;
    case 'nhsdgp001':
    case 'dfocvc001':
      return `${defaultUrl}?frameworkId=${filterType}`;
    default:
      return undefined;
  }
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
