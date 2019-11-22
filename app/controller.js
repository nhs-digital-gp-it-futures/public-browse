import axios from 'axios';
import { createSolutionListPageContext, createFoundationSolutionListPageContext } from './contextCreator/createSolutionListPageContext';

const baseSolutionApiUrl = 'http://localhost:8080/api/v1';

export const getSolutionListPageContext = async (filterType) => {
  if (filterType === 'all') {
    const solutionListResponse = await axios.get(`${baseSolutionApiUrl}/Solutions`);
    return createSolutionListPageContext(
      solutionListResponse.data.solutions,
    );
  }

  if (filterType === 'foundation') {
    const foundationSolutionListResponse = await axios.get(`${baseSolutionApiUrl}/Solutions/Foundation`);
    return createFoundationSolutionListPageContext(
      foundationSolutionListResponse.data.solutions,
    );
  }

  return undefined;
};
