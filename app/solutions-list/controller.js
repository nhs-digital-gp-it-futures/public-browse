import axios from 'axios';
import { createSolutionListPageContext, createFoundationSolutionListPageContext } from './context';
import { apiHost } from '../config';
import logger from '../logger';

export const getSolutionListPageContext = async (filterType) => {
  if (filterType === 'all') {
    const endpoint = `${apiHost}/Solutions`;
    logger.info(`api called: ${endpoint}`);
    const solutionListResponse = await axios.get(endpoint);
    if (solutionListResponse.data && solutionListResponse.data.solutions) {
      logger.info(`${solutionListResponse.data.solutions.length} solutions returned`);
      return createSolutionListPageContext(
        solutionListResponse.data.solutions,
      );
    }
    throw new Error('No solutions returned');
  }

  if (filterType === 'foundation') {
    const endpoint = `${apiHost}/Solutions/Foundation`;
    logger.info(`api called: ${endpoint}`);
    const foundationSolutionListResponse = await axios.get(endpoint);
    if (foundationSolutionListResponse.data && foundationSolutionListResponse.data.solutions) {
      logger.info(`${foundationSolutionListResponse.data.solutions.length} foundation solutions returned`);
      return createFoundationSolutionListPageContext(
        foundationSolutionListResponse.data.solutions,
      );
    }
    throw new Error('No foundation solutions returned');
  }
  throw new Error('Invalid filter type applied');
};
