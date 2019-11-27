import axios from 'axios';
import { createSolutionListPageContext, createFoundationSolutionListPageContext } from './context';
import { apiHost } from '../config';
import logger from '../error/logger';

export const getSolutionListPageContext = async (filterType) => {
  if (filterType === 'all') {
    logger.info('api called: /Solutions');
    const solutionListResponse = await axios.get(`${apiHost}/Solutions`);
    logger.info(`${solutionListResponse.data.solutions.length} solutions returned`);
    return createSolutionListPageContext(
      solutionListResponse.data.solutions,
    );
  }

  if (filterType === 'foundation') {
    logger.info('api called: /Solutions/Foundation');
    const foundationSolutionListResponse = await axios.get(`${apiHost}/Solutions/Foundation`);
    logger.info(`${foundationSolutionListResponse.data.solutions.length} foundation solutions returned`);
    return createFoundationSolutionListPageContext(
      foundationSolutionListResponse.data.solutions,
    );
  }
  throw new Error('Invalid filter type applied');
};
