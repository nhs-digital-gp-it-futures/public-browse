import { buyingCatalogueApiHost, documentApiHost, identityServerUrl } from './config';

const getSolutionListDataEndpoint = (apiHostUrl, filterType) => {
  if (filterType === 'all') {
    return `${apiHostUrl}/api/v1/Solutions`;
  }
  if (filterType === 'foundation') {
    return `${apiHostUrl}/api/v1/Solutions/Foundation`;
  }
  return undefined;
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
