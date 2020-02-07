import { ManifestProvider } from './filterType/manifestProvider';
import { createSolutionListPageContext } from './context';
import { ApiProvider } from '../../apiProvider';
import logger from '../../logger';

const getSolutionListData = async (filterType) => {
  const solutionListResponse = await new ApiProvider().getSolutionListData(filterType);
  if (solutionListResponse && solutionListResponse.data && solutionListResponse.data.solutions) {
    logger.info(`${solutionListResponse.data.solutions.length} solutions returned for type ${filterType}`);
    return solutionListResponse.data.solutions;
  }
  throw new Error(`No endpoint found for filter type: ${filterType}`);
};

export const getSolutionListPageContext = async (filterType) => {
  const solutionListManifest = new ManifestProvider().getSolutionListManifest(filterType);
  const solutionsData = await getSolutionListData(filterType);

  return createSolutionListPageContext(filterType, solutionListManifest, solutionsData);
};
