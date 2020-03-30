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
    capabilities: solution.capabilities && solution.capabilities.map(capability => capability.name),
    isFoundation: solution.isFoundation,
    covid19: solution.covid19,
    viewSolutionUrl,
  });
});

export const createSolutionListPageContext = ({
  filterType, solutionListManifest, solutionsData, capabilitiesSelected,
}) => {
  // TODO: USE_CAPABILITIES_SELECTOR Remove '&& config.useCapabilitiesSelector'
  // when capabilities-selector is on by default
  const backLinkPath = `/solutions${filterType === 'capabilities-selector' && useCapabilitiesSelector === 'true' ? '/capabilities-selector' : ''}`;

  return {
    backLinkPath,
    pageTitle: solutionListManifest.title,
    pageDescription: solutionListManifest.description,
    solutions: createSolutionsContext({
      filterType,
      solutions: solutionsData,
      capabilitiesSelected: capabilitiesSelected && capabilitiesSelected.length < 1 ? ['all'] : capabilitiesSelected,
    }),
    ...(filterType === 'covid19' ? { filterType } : {}),
  };
};
