import axios from 'axios';
import { createViewSolutionPageContext } from './context';

const baseSolutionApiUrl = 'http://localhost:8080/api/v1';

export const getPublicSolutionById = async (solutionId) => {
  const response = await axios.get(`${baseSolutionApiUrl}/Solutions/${solutionId}/Public`);
  return createViewSolutionPageContext(response.data);
};
