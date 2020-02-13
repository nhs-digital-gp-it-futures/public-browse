import { createViewSolutionPageContext } from './context';

describe('createSolutionPageContext', () => {
  it('should create correct context with a solution', () => {
    const expectedContext = {
      id: '100000-001',
      name: 'Write on Time',
      supplierName: 'Aperture Science',
      isFoundation: true,
      lastUpdated: '1996-03-15T10:00:00',
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
    expect(createViewSolutionPageContext(solution)).toEqual(expectedContext);
  });
});
