import { buyingCatalogueApiHost, documentApiHost } from '../config';

export const endpoints = {
  getBuyingCatalogueApiHealth: () => `${buyingCatalogueApiHost}/health/ready`,
  getDocumentApiHealth: () => `${documentApiHost}/health/ready`,
};
