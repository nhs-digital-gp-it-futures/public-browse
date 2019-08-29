import { createSolutionContext } from './createSolutionContext';
import { createPageContentsContext } from './createPageContentsContext';
import { createCapabilityFiltersContext } from './createCapabilityFiltersContext';

export const createShowCardPageContext = (
  solutionData, capabilitiesData, selectedCapabilities, config,
) => {
  const context = {};
  const solutions = [];

  solutionData.map((solData) => {
    solutions.push(createSolutionContext(solData, config));
  });

  context.solutions = solutions;

  context.capabilities = createCapabilityFiltersContext(
    capabilitiesData, selectedCapabilities,
  );

  return context;
};

export const createSolutionPageContext = (solutionData, config) => {
  const context = {};

  const solution = createSolutionContext(solutionData, config);

  context.solution = solution;
  context.pageContents = createPageContentsContext(solution.sections);

  return context;
};
