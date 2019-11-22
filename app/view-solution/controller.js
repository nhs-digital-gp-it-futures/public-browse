import axios from 'axios';
import { createViewSolutionPageContext } from './context';
import { apiHost } from '../config';

export const getPublicSolutionById = async (solutionId) => {
  const response = await axios.get(`${apiHost}/Solutions/${solutionId}/Public`);
  return createViewSolutionPageContext(response.data);
};
