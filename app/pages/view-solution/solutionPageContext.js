export const createViewSolutionPageContext = ({ solutionData, filterType, query }) => ({
  solutionHeader: {
    id: solutionData.id,
    name: solutionData.name,
    supplierName: solutionData.supplierName,
    isFoundation: solutionData.isFoundation,
    lastUpdated: solutionData.lastUpdated,
  },
  solutionBackLinkUrl: filterType === 'capabilities-selector'
    ? `/solutions/capabilities-selector/selected?${query}`
    : '/solutions/foundation/selected',
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
