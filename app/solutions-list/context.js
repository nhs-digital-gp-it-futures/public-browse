const content = require('./manifest.json');

const createSolutionsContext = solutions => solutions.map(solution => ({
  id: solution.id,
  name: solution.name,
  summary: solution.summary,
  organisationName: solution.organisation && solution.organisation.name,
  capabilities: solution.capabilities && solution.capabilities.map(capability => capability.name),
  isFoundation: solution.isFoundation,
}));

export const createSolutionListPageContext = solutions => ({
  pageTitle: content.allSolutionsTitle,
  pageDescription: content.allSolutionsDescription,
  solutions: createSolutionsContext(solutions),
  filterType: 'all',
});

export const createFoundationSolutionListPageContext = solutions => ({
  pageTitle: content.foundationSolutionsTitle,
  pageDescription: content.foundationSolutionsDescription,
  solutions: createSolutionsContext(solutions),
  filterType: 'foundation',
});
