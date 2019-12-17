import axios from 'axios';
import { createViewSolutionPageContext } from './context';
import { apiHost } from '../../config';
import logger from '../../logger';

export const getPublicSolutionById = async (solutionId) => {
  const endpoint = `${apiHost}/api/v1/Solutions/${solutionId}/Public`;
  logger.info(`api called: [GET] ${endpoint}`);
  const response = await axios.get(endpoint);
  if (response.data) {
    logger.info(`Solution ${solutionId}: ${response.data.name} returned`);
    return createViewSolutionPageContext(response.data);
  }
  throw new Error('No data returned');
};
