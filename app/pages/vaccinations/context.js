const createVaccinationsSolutionsContext = ({
  solutions,
}) => solutions.map((solution) => {
  const viewSolutionUrl = `/solutions/vaccinations/${solution.id}`;
  return ({
    id: solution.id,
    name: solution.name,
    summary: solution.summary,
    supplierName: solution.supplier && solution.supplier.name,
    vaccinations: solution.vaccinations,
    viewSolutionUrl,
  });
});

export const createVaccinationsSolutionListPageContext = ({
  manifest, data,
}) => {
  const { solutions } = data;

  return {
    backLinkPath: '/',
    title: manifest.title,
    pageDescription: manifest.description,
    insetText: manifest.insetText,
    solutions: createVaccinationsSolutionsContext({
      solutions,
    }),
  };
};
