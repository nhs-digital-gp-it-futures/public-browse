import axios from 'axios';
import { buyingCatalogueApiHost, documentApiHost } from './config';
import { logger } from './logger';

export class ApiProvider {
  constructor() {
    this.buyingCatalogueApiHost = buyingCatalogueApiHost;
    this.documentApiHost = documentApiHost;
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
