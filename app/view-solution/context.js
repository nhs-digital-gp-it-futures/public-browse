const createDownloadSolutionPath = id => `/$web/content/${id}.pdf?timestamp=${Date.now()}`;

export const createViewSolutionPageContext = solution => ({
  ...solution,
  downloadSolutionUrl: createDownloadSolutionPath(solution.id),
});
