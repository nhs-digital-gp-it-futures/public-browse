// TODO: USE_CAPABILITIES_SELECTOR Remove line below when capabilities-selector is on by default
import { useCapabilitiesSelector } from '../../config';

const createSolutionsContext = ({
  filterType,
  solutions,
  capabilitiesSelected,
}) => solutions.map((solution) => {
  const viewSolutionUrl = `/solutions/${filterType}${capabilitiesSelected ? `.${capabilitiesSelected.join('+')}` : ''}/${solution.id}`;
  return ({
    id: solution.id,
    name: solution.name,
    summary: solution.summary,
    supplierName: solution.supplier && solution.supplier.name,
    capabilities: solution.capabilities && solution.capabilities.map(
      (capability) => capability.name,
    ),
    isFoundation: solution.isFoundation,
    viewSolutionUrl,
  });
});

export const createSolutionListPageContext = ({
  filterType, solutionListManifest, solutionsData, capabilitiesSelected,
}) => {
  let backLinkPath = '/solutions';

  if (filterType === 'capabilities-selector' && useCapabilitiesSelector === 'true') {
    backLinkPath += '/capabilities-selector';
  } else if (filterType === 'dfocvc001') {
    backLinkPath = '/';
  }

  return {
    backLinkPath,
    ...solutionListManifest,
    solutions: createSolutionsContext({
      filterType,
      solutions: solutionsData,
      capabilitiesSelected: capabilitiesSelected && capabilitiesSelected.length < 1 ? ['all'] : capabilitiesSelected,
    }),
  };
};
