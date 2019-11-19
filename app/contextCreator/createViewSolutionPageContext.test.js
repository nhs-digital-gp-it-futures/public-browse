import { createViewSolutionPageContext } from './createViewSolutionPageContext';
import { dummySection, dummySolutionData } from './fixtures/createSolutionData';

describe('createSolutionPageContext', () => {
  it('should create context with correct backLinkPath for browse=all', () => {
    const expectedContext = {
      id: '00001',
      name: 'The first solution',
      organisation: 'Halls',
      sections: [],
      backLinkPath: '/solutions',
    };

    const solution = {
      id: '00001',
      name: 'The first solution',
      organisation: 'Halls',
      sections: [],
    };
    expect(createViewSolutionPageContext(solution, 'all')).toEqual(expectedContext);
  });

  it('should create context with correct backLinkPath for browse=foundation', () => {
    const expectedContext = {
      id: '00001',
      name: 'The first solution',
      organisation: 'Halls',
      sections: [],
      backLinkPath: '/solutions/foundation',
    };

    const solution = {
      id: '00001',
      name: 'The first solution',
      organisation: 'Halls',
      sections: [],
    };
    expect(createViewSolutionPageContext(solution, 'foundation')).toEqual(expectedContext);
  });

  it('should create context with correct backLinkPath for no browse query', () => {
    const expectedContext = {
      id: '00001',
      name: 'The first solution',
      organisation: 'Halls',
      sections: [],
      backLinkPath: '/browse-solutions',
    };

    const solution = {
      id: '00001',
      name: 'The first solution',
      organisation: 'Halls',
      sections: [],
    };
    expect(createViewSolutionPageContext(solution, undefined)).toEqual(expectedContext);
  });

  it('should create context with correct backLinkPath for browse= anystring', () => {
    const expectedContext = {
      id: '00001',
      name: 'The first solution',
      organisation: 'Halls',
      sections: [],
      backLinkPath: '/browse-solutions',
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
