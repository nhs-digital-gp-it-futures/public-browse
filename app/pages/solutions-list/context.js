const createSolutionsContext = (filterType, solutions, query) => solutions.map((solution) => {
  const viewSolutionUrl = filterType === 'capabilities-selector'
    ? `/solutions/capabilities-selector/selected/${solution.id}?${query}`
    : `/solutions/${filterType}/selected/${solution.id}`;
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
  filterType, solutionListManifest, solutionsData, query,
}) => ({
  pageTitle: solutionListManifest.title,
  pageDescription: solutionListManifest.description,
  solutions: createSolutionsContext(filterType, solutionsData, query),
  backLinkUrl: filterType === 'capabilities-selector'
    ? '/solutions/capabilities-selector'
    : '/solutions',
});
