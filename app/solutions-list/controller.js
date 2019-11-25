import axios from 'axios';
import { createSolutionListPageContext, createFoundationSolutionListPageContext } from './context';
import { apiHost } from '../config';

export const getSolutionListPageContext = async (filterType) => {
  if (filterType === 'all') {
    const solutionListResponse = await axios.get(`${apiHost}/Solutions`);
    return createSolutionListPageContext(
      solutionListResponse.data.solutions,
    );
  }

  if (filterType === 'foundation') {
    const foundationSolutionListResponse = await axios.get(`${apiHost}/Solutions/Foundation`);
    return createFoundationSolutionListPageContext(
      foundationSolutionListResponse.data.solutions,
    );
  }
  throw new Error('Invalid filter type applied');
};
