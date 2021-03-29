import { getData, postData } from 'buying-catalogue-library';
import { getSolutionListManifest } from './filterType/manifestProvider';
import { createSolutionListPageContext } from './context';
import { logger } from '../../logger';
import { getEndpoint } from '../../endpoints';

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
  let filter = filterType;
  if (filter === 'dfocvc') filter = 'DFOCVC001';

  const solutionListManifest = getSolutionListManifest(filter);

  const endpoint = getEndpoint({ endpointLocator: 'getSolutionListData', options: { filterType: filter } });
  const solutionListResponse = await getData({ endpoint, logger });

  if (solutionListResponse && solutionListResponse.solutions) {
    logger.info(`${solutionListResponse.solutions.length} solutions returned for type ${filter}`);

    return createSolutionListPageContext({
      filterType: filter,
      solutionListManifest,
      solutionsData: solutionListResponse.solutions,
    });
  }
  logger.error(`No solutions found for filter type: ${filter}`);
  throw new Error();
};

export const getSolutionsForSelectedCapabilities = async ({ capabilitiesSelected }) => {
  const solutionListManifest = getSolutionListManifest('capabilities-selector');
  const formattedCapabilities = capabilitiesSelected === 'all' ? [] : capabilitiesSelected.split('+');
  const transformedCapabilities = transformCapabilities({
    capabilitiesSelected: formattedCapabilities,
  });

  const endpoint = getEndpoint({ endpointLocator: 'postSelectedCapabilities' });
  const solutionsData = await postData({ endpoint, body: transformedCapabilities, logger });

  return createSolutionListPageContext({
    filterType: 'capabilities-selector',
    solutionListManifest,
    solutionsData: solutionsData.data.solutions,
    capabilitiesSelected: formattedCapabilities,
  });
};
