export const createViewSolutionPageContext = ({ solutionData }) => ({
  title: solutionData.name,
  solutionHeader: {
    id: solutionData.id,
    name: solutionData.name,
    supplierName: solutionData.supplierName,
    isFoundation: solutionData.isFoundation,
    lastUpdated: solutionData.lastUpdated,
    frameworks: solutionData.frameworks,
  },
  sections: Object.fromEntries(
    Object.entries(solutionData.sections).map(([key, sectionValue]) => {
      if (sectionValue.answers && sectionValue.answers['document-name']) {
        const answerSection = {
          answers: {
            ...sectionValue.answers,
            'document-link': `${solutionData.id}/document/${sectionValue.answers['document-name']}`,
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
