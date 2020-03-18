import { buyingCatalogueApiHost, documentApiHost } from '../config';
import { getSolutionListDataEndpoint } from './endpointsHelper';

export const endpoints = {
  getBuyingCatalogueApiHealth: () => `${buyingCatalogueApiHost}/health/ready`,
  getDocumentApiHealth: () => `${documentApiHost}/health/ready`,
  getSolutionListData:
    options => getSolutionListDataEndpoint(buyingCatalogueApiHost, options.filterType),
  getPublicSolutionById: options => `${buyingCatalogueApiHost}/api/v1/Solutions/${options.solutionId}/Public`,
  getDocument: (solutionId, documentName) => `${documentApiHost}/api/v1/Solutions/${solutionId}/documents/${documentName}`,
};
