import axios from 'axios';
import { createSolutionListPageContext, createFoundationSolutionListPageContext } from './contextCreator/createSolutionListPageContext';
import { createViewSolutionPageContext } from './contextCreator/createViewSolutionPageContext';
import { apiHost } from './config';

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

  return undefined;
};

export const getPublicSolutionById = async (solutionId) => {
  const response = await axios.get(`${apiHost}/Solutions/${solutionId}/Public`);
  return createViewSolutionPageContext(response.data);
};
