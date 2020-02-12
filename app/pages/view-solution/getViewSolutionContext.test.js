import { createViewSolutionPageContext } from './getViewSolutionContext';

Date.now = jest.fn(() => 'some-date');

describe('createViewSolutionPageContext', () => {
  it('should create correct context with a solution', () => {
    const expectedContext = {
      solutionHeader: {
        id: '100000-001',
        name: 'Write on Time',
        supplierName: 'Aperture Science',
        isFoundation: true,
        lastUpdated: '1996-03-15T10:00:00',
      },
      sections: {},
    };

    const solution = {
      id: '100000-001',
      name: 'Write on Time',
      supplierName: 'Aperture Science',
      isFoundation: true,
      lastUpdated: '1996-03-15T10:00:00',
      sections: {},
    };
    expect(createViewSolutionPageContext({ solution })).toEqual(expectedContext);
  });
});
