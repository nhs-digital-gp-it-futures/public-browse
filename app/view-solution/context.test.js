import { createViewSolutionPageContext } from './context';

describe('createSolutionPageContext', () => {
  it('should create correct context with a solution', () => {
    const expectedContext = {
      id: '00001',
      name: 'The first solution',
      organisation: 'Halls',
      sections: [],
      downloadSolutionUrl: 'https://gpitfuturesadev.blob.core.windows.net/$web/content/00001.pdf',
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
