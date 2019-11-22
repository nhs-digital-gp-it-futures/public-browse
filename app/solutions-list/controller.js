import axios from 'axios';
import { createSolutionListPageContext, createFoundationSolutionListPageContext } from './context';

export const getSolutionListPageContext = async (filterType) => {
  if (filterType === 'all') {
    const solutionListResponse = await axios.get('http://localhost:8080/api/v1/Solutions');
    return createSolutionListPageContext(
      solutionListResponse.data.solutions,
    );
  }
  if (filterType === 'foundation') {
    const foundationSolutionListResponse = await axios.get('http://localhost:8080/api/v1/Solutions/Foundation');
    return createFoundationSolutionListPageContext(
      foundationSolutionListResponse.data.solutions,
    );
  }
  return undefined;
};
