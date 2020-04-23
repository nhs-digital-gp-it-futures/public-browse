import axios from 'axios';
import { logger } from './logger';
import { buyingCatalogueApiHost, documentApiHost, oidcBaseUri } from './config';

const getHeaders = accessToken => (accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {});

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
  getIdentityApiHealth: () => `${oidcBaseUri}/health/ready`,
  getSolutionListData:
    options => getSolutionListDataEndpoint(buyingCatalogueApiHost, options.filterType),
  getPublicSolutionById: options => `${buyingCatalogueApiHost}/api/v1/Solutions/${options.solutionId}/Public`,
  getCapabilities: () => `${buyingCatalogueApiHost}/api/v1/Capabilities`,
  // GET Documents endpoint
  getSolutionDocument: options => `${documentApiHost}/api/v1/Solutions/${options.solutionId}/documents/${options.documentName}`,
  getDocument: options => `${documentApiHost}/api/v1/documents/${options.documentName}`,
  // POST endpoints
  postSelectedCapabilities: () => `${buyingCatalogueApiHost}/api/v1/Solutions`,
};

export const getData = async ({ endpointLocator, options, accessToken }) => {
  const endpoint = endpoints[endpointLocator](options);
  logger.info(`api called: [GET] ${endpoint}`);

  const response = await axios.get(endpoint, getHeaders(accessToken));
  return response.data || null;
};

export const getDocument = ({ options, endpointLocator }) => {
  const endpoint = endpoints[endpointLocator](options);
  logger.info(`api called: [GET] ${endpoint}`);
  return axios.get(endpoint, { responseType: 'stream' });
};

export const postData = async ({ endpointLocator, options, body }) => {
  const endpoint = endpoints[endpointLocator](options);
  logger.info(`api called: [POST] ${endpoint}: ${JSON.stringify(body)}`);
  return axios.post(endpoint, body);
};
