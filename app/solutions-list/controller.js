import axios from 'axios';
import { ManifestProvider } from './filterType/manifestProvider';
import { createSolutionListPageContext } from './context';
import { apiHost } from '../config';
import logger from '../logger';

const getSolutionListDataEndpoint = (filterType) => {
  if (filterType === 'all') {
    return `${apiHost}/Solutions`;
  }

  if (filterType === 'foundation') {
    return `${apiHost}/Solutions/Foundation`;
  }

  return undefined;
};

const getSolutionListData = async (filterType) => {
  const endpoint = getSolutionListDataEndpoint(filterType);
  if (endpoint) {
    logger.info(`api called: ${endpoint}`);
    const solutionListResponse = await axios.get(endpoint);
    if (solutionListResponse && solutionListResponse.data && solutionListResponse.data.solutions) {
      logger.info(`${solutionListResponse.data.solutions.length} solutions returned for type ${filterType}`);
      return solutionListResponse.data.solutions;
    }
  }

  throw new Error(`No endpoint found for filter type: ${filterType}`);
};

export const getSolutionListPageContext = async (filterType) => {
  const solutionListManifest = new ManifestProvider().getSolutionListManifest(filterType);
  const solutionsData = await getSolutionListData(filterType);

  return createSolutionListPageContext(filterType, solutionListManifest, solutionsData);
};
