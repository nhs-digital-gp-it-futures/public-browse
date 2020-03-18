import { ManifestProvider } from './filterType/manifestProvider';
import { getData, postData } from '../../apiProvider2';
import { createSolutionListPageContext } from './context';
import { logger } from '../../logger';

const getSolutionListData = async (filterType) => {
  const solutionListResponse = await getData({ endpointLocator: 'getSolutionListData', options: { filterType } });

  if (solutionListResponse && solutionListResponse.solutions) {
    logger.info(`${solutionListResponse.solutions.length} solutions returned for type ${filterType}`);
    return solutionListResponse.solutions;
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
  const solutionListManifest = new ManifestProvider().getSolutionListManifest('capabilities-selector');
  const formattedCapabilities = capabilitiesSelected === 'all' ? [] : capabilitiesSelected.split('+');
  const transformedCapabilities = transformCapabilities({
    capabilitiesSelected: formattedCapabilities,
  });

  const solutionsData = await postData({ endpointLocator: 'postSelectedCapabilities', body: { selectedCapabilities: transformedCapabilities } });

  return createSolutionListPageContext({
    filterType: 'capabilities-selector',
    solutionListManifest,
    solutionsData: solutionsData.data.solutions,
    capabilitiesSelected: formattedCapabilities,
  });
};
