import { createViewSolutionPageContext } from './createViewSolutionPageContext';

describe('createSolutionPageContext', () => {
  it('should create correct context with a solution', () => {
    const expectedContext = {
      id: '00001',
      name: 'The first solution',
      organisation: 'Halls',
      sections: [],
    };

    const solution = {
      id: '00001',
      name: 'The first solution',
      organisation: 'Halls',
      sections: [],
    };
    expect(createViewSolutionPageContext(solution)).toEqual(expectedContext);
  });
});
