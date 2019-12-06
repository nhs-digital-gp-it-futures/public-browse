const createDownloadSolutionUrl = id => `https://gpitfuturessadev.blob.core.windows.net/$web/content/${id}.pdf?timestamp=${Date.now()}`;

export const createViewSolutionPageContext = solution => ({
  ...solution,
  downloadSolutionUrl: createDownloadSolutionUrl(solution.id),
});
