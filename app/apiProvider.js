import axios from 'axios';
import { buyingCatalogueApiHost, documentApiHost } from './config';
import { logger } from './logger';

const getSolutionListDataEndpoint = (apiHostUrl, filterType) => {
  if (filterType === 'all') {
    return `${apiHostUrl}/api/v1/Solutions`;
  }
  if (filterType === 'foundation') {
    return `${apiHostUrl}/api/v1/Solutions/Foundation`;
  }
  return undefined;
};

export class ApiProvider {
  constructor() {
    this.buyingCatalogueApiHost = buyingCatalogueApiHost;
    this.documentApiHost = documentApiHost;
  }

  async getBuyingCatalogueApiHealth() {
    const endpoint = `${this.buyingCatalogueApiHost}/health/ready`;
    logger.info(`api called: [GET] ${endpoint}`);
    return axios.get(endpoint);
  }

  async getDocumentApiHealth() {
    const endpoint = `${this.documentApiHost}/health/ready`;
    logger.info(`api called: [GET] ${endpoint}`);
    return axios.get(endpoint);
  }

  async getSolutionListData(filterType) {
    const endpoint = getSolutionListDataEndpoint(this.buyingCatalogueApiHost, filterType);
    if (endpoint) {
      logger.info(`api called: [GET] ${endpoint}`);
      return axios.get(endpoint);
    }
    return false;
  }

  async getPublicSolutionById({ solutionId }) {
    const endpoint = `${this.buyingCatalogueApiHost}/api/v1/Solutions/${solutionId}/Public`;
    logger.info(`api called: [GET] ${endpoint}`);
    return axios.get(endpoint);
  }

  async getDocument({ solutionId, documentName }) {
    const endpoint = `${this.documentApiHost}/api/v1/Solutions/${solutionId}/documents/${documentName}`;
    logger.info(`api called: [GET] ${endpoint}`);
    return axios.get(endpoint, { responseType: 'stream' });
  }

  async getCapabilities() {
    const endpoint = `${this.buyingCatalogueApiHost}/api/v1/Capabilities`;
    logger.info(`api called: [GET] ${endpoint}`);
    return axios.get(endpoint);
  }

  async postSelectedCapabilities({ selectedCapabilities }) {
    const endpoint = `${this.buyingCatalogueApiHost}/api/v1/Solutions`;
    logger.info(`api called: [POST] ${endpoint}: ${JSON.stringify(selectedCapabilities)}`);
    return axios.post(endpoint, selectedCapabilities);
  }
}
