import { createSolutionContext } from './createSolutionContext';
import { createPageContentsContext } from './createPageContentsContext';

export const createSolutionPageContext = (solutionData, config) => {
  const context = {};

  const solution = createSolutionContext(solutionData, config);

  context.solution = solution;
  context.pageContents = createPageContentsContext(solution.sections);

  return context;
};
