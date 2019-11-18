import axios from 'axios';
import { createSolutionPageContext } from './contextCreator/createSolutionPageContext';
import { createSolutionListPageContext, createFoundationSolutionListPageContext } from './contextCreator/createSolutionListPageContext';

export const getSolutionFoundationListPageContext = async () => {
  const foundationSolutionListResponse = await axios.get('http://localhost:8080/api/v1/Solutions/Foundation');

  const context = createFoundationSolutionListPageContext(
    foundationSolutionListResponse.data.solutions,
  );

  return context;
};

export const getSolutionListPageContext = async () => {
  const solutionListResponse = await axios.get('http://localhost:8080/api/v1/Solutions');

  const context = createSolutionListPageContext(
    solutionListResponse.data.solutions,
  );

  return context;
};

export const getSolutionPageContext = async (solutionId) => {
  const solutionData = await axios.get(`http://localhost:8080/api/v1/Solution/${solutionId}`);

  const context = createSolutionPageContext(solutionData.data.solution);

  return context;
};

export const getPublicSolutionById = solutionId => axios.get(`http://localhost:8080/api/v1/Solutions/${solutionId}/Public`)
  .then(data => data.data)
  .catch(err => console.log(err));
