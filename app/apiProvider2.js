import axios from 'axios';
import { endpoints } from './helpers/endpoints';
import { logger } from './logger';

const getHeaders = accessToken => (accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {});

export const getData = async ({ endpointLocator, options, accessToken }) => {
  const endpoint = endpoints[endpointLocator](options);
  logger.info(`api called: [GET] ${endpoint}`);

  const response = await axios.get(endpoint, getHeaders(accessToken));
  return response.data || null;
};

export const getDocument = ({ solutionId, documentName }) => {
  const endpoint = endpoints.getDocument({ options: { solutionId, documentName } });
  logger.info(`api called: [GET] ${endpoint}`);
  return axios.get(endpoint, { responseType: 'stream' });
};

export const postData = async ({ endpointLocator, options, body }) => {
  const endpoint = endpoints[endpointLocator](options);
  logger.info(`api called: [POST] ${endpoint}: ${JSON.stringify(body)}`);
  return axios.post(endpoint, body);
};
