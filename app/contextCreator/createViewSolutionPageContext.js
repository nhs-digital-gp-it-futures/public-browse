const createBackLink = (browseSolutionType) => {
  if (browseSolutionType) {
    if (browseSolutionType === 'all') return '/solutions';
    if (browseSolutionType === 'foundation') return '/solutions/foundation';
  }
  return '/browse-solutions';
};

export const createViewSolutionPageContext = (solution, browseSolutionType) => ({
  ...solution,
  backLinkPath: createBackLink(browseSolutionType),
});
