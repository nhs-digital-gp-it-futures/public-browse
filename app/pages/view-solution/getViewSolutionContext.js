export const createViewSolutionPageContext = ({ solution }) => ({
  solutionHeader: {
    id: solution.id,
    name: solution.name,
    supplierName: solution.supplierName,
    isFoundation: solution.isFoundation,
    lastUpdated: solution.lastUpdated,
  },
  sections: Object.fromEntries(
    Object.entries(solution.sections).map(([key, sectionValue]) => {
      if (sectionValue.answers && sectionValue.answers['document-name']) {
        const answerSection = {
          answers: {
            ...sectionValue.answers,
            'document-link': `document/${sectionValue.answers['document-name']}`,
          },
        };
        delete answerSection.answers['document-name'];
        return [key, {
          ...sectionValue,
          ...answerSection,
        }];
      }
      return [key, sectionValue];
    }),
  ),
});
