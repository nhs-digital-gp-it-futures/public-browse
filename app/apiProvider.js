import axios from 'axios';
import { apiHost, documentHost } from './config';
import logger from './logger';

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
    this.apiHost = apiHost;
    this.documentHost = documentHost;
  }

  async getSolutionListData(filterType) {
    const endpoint = getSolutionListDataEndpoint(this.apiHost, filterType);
    if (endpoint) {
      logger.info(`api called: [GET] ${endpoint}`);
      return axios.get(endpoint);
    }
    return false;
  }

  async getPublicSolutionById({ solutionId }) {
    const endpoint = `${this.apiHost}/api/v1/Solutions/${solutionId}/Public`;
    logger.info(`api called: [GET] ${endpoint}`);
    return axios.get(endpoint);
  }

  async getDocument({ solutionId, documentName }) {
    const endpoint = `${this.documentHost}/api/v1/Solutions/${solutionId}/documents/${documentName}`;
    logger.info(`api called: [GET] ${endpoint}`);
    return axios.get(endpoint, { responseType: 'stream' });
  }
}
