const createSolutionsContext = solutions => solutions.map(solution => ({
  id: solution.id,
  name: solution.name,
  summary: solution.summary,
  organisationName: solution.organisation && solution.organisation.name,
  capabilities: solution.capabilities && solution.capabilities.map(capability => capability.name),
  isFoundation: solution.isFoundation,
}));

export const createSolutionListPageContext = (solutions, pageTitle, pageDescription) => ({
  pageTitle,
  pageDescription,
  solutions: createSolutionsContext(solutions),
});
