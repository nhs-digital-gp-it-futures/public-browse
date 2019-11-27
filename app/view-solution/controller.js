import axios from 'axios';
import { createViewSolutionPageContext } from './context';
import { apiHost } from '../config';
import logger from '../error/logger';

export const getPublicSolutionById = async (solutionId) => {
  logger.info(`api called: /Solutions/${solutionId}/Public`);
  const response = await axios.get(`${apiHost}/Solutions/${solutionId}/Public`);
  if (response.data) {
    logger.info(`Solution ${solutionId}: ${response.data.name} returned`);
    return createViewSolutionPageContext(response.data);
  }
  throw new Error('No data returned');
};
