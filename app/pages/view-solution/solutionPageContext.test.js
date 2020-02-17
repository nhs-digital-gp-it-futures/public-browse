import { createViewSolutionPageContext } from './solutionPageContext';

const expectedContext = {
  solutionHeader: {
    id: '100000-001',
    name: 'Write on Time',
    supplierName: 'Really Kool Corporation',
    isFoundation: true,
    lastUpdated: '1996-03-15T10:00:00',
  },
};

const solutionData = {
  id: '100000-001',
  name: 'Write on Time',
  supplierName: 'Really Kool Corporation',
  isFoundation: true,
  lastUpdated: '1996-03-15T10:00:00',
};

describe('createViewSolutionPageContext', () => {
  it('should return the sections provided in the solutionData', () => {
    const newExpectedContext = {
      ...expectedContext,
      sections: {
        'some-section': {
          answers: {},
        },
      },
    };
    const newSolutionData = {
      ...solutionData,
      sections: {
        'some-section': {
          answers: {},
        },
      },
    };

    const context = createViewSolutionPageContext({ solutionData: newSolutionData });

    expect(context).toEqual(newExpectedContext);
  });

  it('should create documentLink for all documentName', () => {
    const newExpectedContext = {
      ...expectedContext,
      sections: {
        'some-section': {
          answers: {
            'document-link': '100000-001/document/document.pdf',
          },
        },
      },
    };

    const newSolutionData = {
      ...solutionData,
      sections: {
        'some-section': {
          answers: {
            'document-name': 'document.pdf',
          },
        },
      },
    };

    const context = createViewSolutionPageContext({ solutionData: newSolutionData });

    expect(context).toEqual(newExpectedContext);
  });

  it('should maintain other properties', () => {
    const newExpectedContext = {
      ...expectedContext,
      sections: {
        'some-section': {
          answers: {
            'an-answer': true,
            'document-link': '100000-001/document/document.pdf',
          },
        },
      },
    };

    const newSolutionData = {
      ...solutionData,
      sections: {
        'some-section': {
          answers: {
            'an-answer': true,
            'document-name': 'document.pdf',
          },
        },
      },
    };

    const context = createViewSolutionPageContext({ solutionData: newSolutionData });

    expect(context).toEqual(newExpectedContext);
  });

  it('should manage multiple sections', () => {
    const newExpectedContext = {
      ...expectedContext,
      sections: {
        'first-section': {
          answers: {
            'an-answer': true,
            'document-link': '100000-001/document/document.pdf',
          },
        },
        'second-section': {
          answers: {
            'an-answer': true,
          },
        },
        'third-section': {
          answers: { },
        },
        'fourth-section': {
          answers: {
            'document-link': '100000-001/document/document.pdf',
          },
        },
      },
    };

    const newSolutionData = {
      ...solutionData,
      sections: {
        'first-section': {
          answers: {
            'an-answer': true,
            'document-name': 'document.pdf',
          },
        },
        'second-section': {
          answers: {
            'an-answer': true,
          },
        },
        'third-section': {
          answers: { },
        },
        'fourth-section': {
          answers: {
            'document-name': 'document.pdf',
          },
        },
      },
    };

    const context = createViewSolutionPageContext({ solutionData: newSolutionData });

    expect(context).toEqual(newExpectedContext);
  });
});
