import { createViewSolutionPageContext } from './context';

Date.now = jest.fn(() => 'some-date');

describe('createSolutionPageContext', () => {
  it('should create correct context with a solution', () => {
    const expectedContext = {
      id: '100000-001',
      name: 'Write on Time',
      supplierName: 'Aperture Science',
      isFoundation: true,
      lastUpdated: '1996-03-15T10:00:00',
      sections: [],
      downloadSolutionUrl: '/$web/content/100000-001.pdf?timestamp=some-date',
    };

    const solution = {
      id: '100000-001',
      name: 'Write on Time',
      supplierName: 'Aperture Science',
      isFoundation: true,
      lastUpdated: '1996-03-15T10:00:00',
      sections: [],
    };
    expect(createViewSolutionPageContext(solution)).toEqual(expectedContext);
  });
});
