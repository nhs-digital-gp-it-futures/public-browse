import covid19Data from './filterType/covid19/data/covid19-solutions.json';
import { getSolutionListManifest } from './filterType/manifestProvider';
import { getData, postData } from '../../apiProvider';
import { createSolutionListPageContext } from './context';
import { logger } from '../../logger';

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
  const solutionListManifest = getSolutionListManifest(filterType);
  const solutionListResponse = filterType === 'covid19' ? covid19Data : await getData({ endpointLocator: 'getSolutionListData', options: { filterType } });


  if (solutionListResponse && solutionListResponse.solutions) {
    logger.info(`${solutionListResponse.solutions.length} solutions returned for type ${filterType}`);

    return createSolutionListPageContext({
      filterType,
      solutionListManifest,
      solutionsData: solutionListResponse.solutions,
    });
  }

  throw new Error(`No endpoint found for filter type: ${filterType}`);
};

export const getSolutionsForSelectedCapabilities = async ({ capabilitiesSelected }) => {
  const solutionListManifest = getSolutionListManifest('capabilities-selector');
  const formattedCapabilities = capabilitiesSelected === 'all' ? [] : capabilitiesSelected.split('+');
  const transformedCapabilities = transformCapabilities({
    capabilitiesSelected: formattedCapabilities,
  });

  const solutionsData = await postData({ endpointLocator: 'postSelectedCapabilities', body: transformedCapabilities });

  return createSolutionListPageContext({
    filterType: 'capabilities-selector',
    solutionListManifest,
    solutionsData: solutionsData.data.solutions,
    capabilitiesSelected: formattedCapabilities,
  });
};
