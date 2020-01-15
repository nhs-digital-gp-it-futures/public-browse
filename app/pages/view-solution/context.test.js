import { createViewSolutionPageContext } from './context';

Date.now = jest.fn(() => 'some-date');

describe('createSolutionPageContext', () => {
  it('should create correct context with a solution', () => {
    const expectedContext = {
      id: '00001',
      name: 'The first solution',
      supplier: 'Halls',
      sections: [],
      downloadSolutionUrl: '/$web/content/00001.pdf?timestamp=some-date',
    };

    const solution = {
      id: '00001',
      name: 'The first solution',
      supplier: 'Halls',
      sections: [],
    };
    expect(createViewSolutionPageContext(solution)).toEqual(expectedContext);
  });
});
