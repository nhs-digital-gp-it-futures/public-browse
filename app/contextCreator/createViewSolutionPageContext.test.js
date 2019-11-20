import { createViewSolutionPageContext } from './createViewSolutionPageContext';

describe('createSolutionPageContext', () => {
  it('should create context with correct viewSolutionBackLinkPath for browse=all', () => {
    const expectedContext = {
      id: '00001',
      name: 'The first solution',
      organisation: 'Halls',
      sections: [],
      viewSolutionBackLinkPath: '/solutions',
      downloadSolutionUrl: 'https://gpitfuturesadev.blob.core.windows.net/$web/content/00001.pdf',
    };

    const solution = {
      id: '00001',
      name: 'The first solution',
      organisation: 'Halls',
      sections: [],
    };
    expect(createViewSolutionPageContext(solution, 'all')).toEqual(expectedContext);
  });

  it('should create context with correct viewSolutionBackLinkPath for browse=foundation', () => {
    const expectedContext = {
      id: '00001',
      name: 'The first solution',
      organisation: 'Halls',
      sections: [],
      viewSolutionBackLinkPath: '/solutions/foundation',
      downloadSolutionUrl: 'https://gpitfuturesadev.blob.core.windows.net/$web/content/00001.pdf',
    };

    const solution = {
      id: '00001',
      name: 'The first solution',
      organisation: 'Halls',
      sections: [],
    };
    expect(createViewSolutionPageContext(solution, 'foundation')).toEqual(expectedContext);
  });

  it('should create context with correct viewSolutionBackLinkPath for no browse query', () => {
    const expectedContext = {
      id: '00001',
      name: 'The first solution',
      organisation: 'Halls',
      sections: [],
      viewSolutionBackLinkPath: '/browse-solutions',
      downloadSolutionUrl: 'https://gpitfuturesadev.blob.core.windows.net/$web/content/00001.pdf',
    };

    const solution = {
      id: '00001',
      name: 'The first solution',
      organisation: 'Halls',
      sections: [],
    };
    expect(createViewSolutionPageContext(solution, undefined)).toEqual(expectedContext);
  });

  it('should create context with correct viewSolutionBackLinkPath for browse= anystring', () => {
    const expectedContext = {
      id: '00001',
      name: 'The first solution',
      organisation: 'Halls',
      sections: [],
      viewSolutionBackLinkPath: '/browse-solutions',
      downloadSolutionUrl: 'https://gpitfuturesadev.blob.core.windows.net/$web/content/00001.pdf',
    };

    const solution = {
      id: '00001',
      name: 'The first solution',
      organisation: 'Halls',
      sections: [],
    };
    expect(createViewSolutionPageContext(solution, 'randomstring')).toEqual(expectedContext);
  });
});
