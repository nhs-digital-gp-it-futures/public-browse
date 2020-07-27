const createCovid19SolutionsContext = ({
  solutions,
}) => solutions.map((solution) => {
  const viewSolutionUrl = `/solutions/covid19/${solution.id}`;
  return ({
    id: solution.id,
    name: solution.name,
    summary: solution.summary,
    supplierName: solution.supplier && solution.supplier.name,
    covid19: solution.covid19,
    viewSolutionUrl,
  });
});

export const createCovid19SolutionListPageContext = ({
  manifest, data,
}) => {
  const { solutions } = data;

  return {
    backLinkPath: '/',
    title: manifest.title,
    pageDescription: manifest.description,
    insetText: manifest.insetText,
    solutions: createCovid19SolutionsContext({
      solutions,
    }),
  };
};
