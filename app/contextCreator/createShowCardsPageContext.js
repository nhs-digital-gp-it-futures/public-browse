import { createSolutionContext } from './createSolutionContext';
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
