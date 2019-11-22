const createDownloadSolutionUrl = id => `https://gpitfuturesadev.blob.core.windows.net/$web/content/${id}.pdf`;

export const createViewSolutionPageContext = (solution) => ({
  ...solution,
  downloadSolutionUrl: createDownloadSolutionUrl(solution.id),
});
