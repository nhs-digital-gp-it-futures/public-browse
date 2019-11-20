const createBackLink = (browseSolutionType) => {
  if (browseSolutionType) {
    if (browseSolutionType === 'all') return '/solutions';
    if (browseSolutionType === 'foundation') return '/solutions/foundation';
  }
  return '/browse-solutions';
};

const createDownloadSolutionUrl = id => `https://gpitfuturesadev.blob.core.windows.net/$web/content/${id}.pdf`;

export const createViewSolutionPageContext = (solution, browseSolutionType) => ({
  ...solution,
  viewSolutionBackLinkPath: createBackLink(browseSolutionType),
  downloadSolutionUrl: createDownloadSolutionUrl(solution.id),
});
