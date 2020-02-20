const createSolutionsContext = ({
  filterType,
  solutions,
  capabilitiesSelected,
}) => solutions.map((solution) => {
  const viewSolutionUrl = `/solutions/${filterType}${capabilitiesSelected ? `.${capabilitiesSelected}` : ''}/${solution.id}`;
  return ({
    id: solution.id,
    name: solution.name,
    summary: solution.summary,
    supplierName: solution.supplier && solution.supplier.name,
    capabilities: solution.capabilities && solution.capabilities.map(capability => capability.name),
    isFoundation: solution.isFoundation,
    viewSolutionUrl,
  });
});

export const createSolutionListPageContext = ({
  filterType, solutionListManifest, solutionsData, capabilitiesSelected,
}) => ({
  backLinkPath: `/solutions${filterType === 'capabilities-selector' ? '/capabilities-selector' : ''}`,
  pageTitle: solutionListManifest.title,
  pageDescription: solutionListManifest.description,
  solutions: createSolutionsContext({ filterType, solutions: solutionsData, capabilitiesSelected }),
});
