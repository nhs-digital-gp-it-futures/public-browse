const createSolutionsContext = solutions => solutions.map(solution => ({
  id: solution.id,
  name: solution.name,
  summary: solution.summary,
  organisationName: solution.organisation && solution.organisation.name,
  capabilities: solution.capabilities && solution.capabilities.map(capability => capability.name),
  isFoundation: solution.isFoundation,
}));

export const createSolutionListPageContext = solutions => ({
  pageTitle: 'All Solutions results',
  pageDescription: 'These are the Solutions on the GP IT Futures framework available from the Buying Catalogue.',
  solutions: createSolutionsContext(solutions),
  backLinkPath: '?filterType=all',
});

export const createFoundationSolutionListPageContext = solutions => ({
  pageTitle: 'Foundation Solutions results',
  pageDescription: 'These Solutions meet the six Foundation Capabilities (the business needs a Solution addresses) mandated by NHS England’s GP IT Futures Operating Model. All six Capabilities must be fulfilled to achieve Foundation Solution status.',
  solutions: createSolutionsContext(solutions),
  backLinkPath: '?filterType=foundation',
});
