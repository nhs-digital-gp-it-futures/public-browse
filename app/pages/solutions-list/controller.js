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

const transformCapabilities = ({ capabilitiesSelected }) => {
  if (!capabilitiesSelected) return { capabilities: [] };
  const transformed = capabilitiesSelected.reduce((acc, capabilityId) => {
    acc.push({ reference: capabilityId });
    return acc;
  }, []);
  return {
    capabilities: transformed,
  };
};

export const getSolutionListPageContext = async ({ filterType }) => {
  const solutionListManifest = new ManifestProvider().getSolutionListManifest(filterType);
  const solutionsData = await getSolutionListData(filterType);
  return createSolutionListPageContext({
    filterType,
    solutionListManifest,
    solutionsData,
  });
};

export const getSolutionsForSelectedCapabilities = async ({ capabilitiesSelected }) => {
  const formattedCapabilities = capabilitiesSelected.split('+');
  const solutionListManifest = new ManifestProvider().getSolutionListManifest('capabilities-selector');
  const transformedCapabilities = transformCapabilities({
    capabilitiesSelected: formattedCapabilities,
  });
  const solutionsData = await new ApiProvider()
    .postSelectedCapabilities({ selectedCapabilities: transformedCapabilities });
  return createSolutionListPageContext({
    filterType: 'capabilities-selector',
    solutionListManifest,
    solutionsData: solutionsData.data.solutions,
    capabilitiesSelected: formattedCapabilities,
  });
};
