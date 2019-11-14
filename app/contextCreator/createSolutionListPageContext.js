export const createSolutionListPageContext = (solutions) => {
  const context = {};

  context.solutions = solutions.map(solution => {
    return {
      id: solution.id,
      name: solution.name,
      summary: solution.summary,
      organisationName: solution.organisation.name,
      capabilities: solution.capabilities.map(capability => capability.name)
    }
  })

  return context;
};
