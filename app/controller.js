import axios from 'axios';
import { createViewSolutionPageContext } from './contextCreator/createViewSolutionPageContext';

export const getPublicSolutionById = async (solutionId, filterType) => {
  const response = await axios.get(`http://localhost:8080/api/v1/Solutions/${solutionId}/Public`);
  return createViewSolutionPageContext(response.data, filterType);
};
