import { buyingCatalogueApiHost, documentApiHost } from '../config';
import { getSolutionListDataEndpoint } from './endpointsHelper';

export const endpoints = {
  getBuyingCatalogueApiHealth: () => `${buyingCatalogueApiHost}/health/ready`,
  getDocumentApiHealth: () => `${documentApiHost}/health/ready`,
  getSolutionListData:
    options => getSolutionListDataEndpoint(buyingCatalogueApiHost, options.filterType),
  getPublicSolutionById: solutionId => `${buyingCatalogueApiHost}/api/v1/Solutions/${solutionId}/Public`,
};
