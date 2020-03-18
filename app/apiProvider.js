import axios from 'axios';
import { buyingCatalogueApiHost, documentApiHost } from './config';
import { logger } from './logger';

export class ApiProvider {
  constructor() {
    this.buyingCatalogueApiHost = buyingCatalogueApiHost;
    this.documentApiHost = documentApiHost;
  }

  async postSelectedCapabilities({ selectedCapabilities }) {
    const endpoint = `${this.buyingCatalogueApiHost}/api/v1/Solutions`;
    logger.info(`api called: [POST] ${endpoint}: ${JSON.stringify(selectedCapabilities)}`);
    return axios.post(endpoint, selectedCapabilities);
  }
}
