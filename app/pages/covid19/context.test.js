import { createCovid19SolutionListPageContext } from './context';

import manifest from './manifest';

const defaultExpectedContext = {
  pageTitle: manifest.title,
  pageDescription: manifest.description,
  buttonText: manifest.buttonText,
  subtext: manifest.subtext,
  backLinkPath: '/solutions',
  solutions: [],
};

describe('createCovid19SolutionListPageContext - covid19', () => {
  it('should create a context for the covid19 page with one solution', () => {
    const expectedContext = {
      ...defaultExpectedContext,
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          supplierName: 'Some supplier',
          covid19: {
            title: 'Some title',
            list: [
              'First list item',
              'Second list item',
              'Second list item',
            ],
          },
          viewSolutionUrl: '/solutions/covid19/00001',
        },
      ],
    };

    const data = {
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          supplier: {
            id: '1',
            name: 'Some supplier',
          },
          covid19: {
            title: 'Some title',
            list: [
              'First list item',
              'Second list item',
              'Second list item',
            ],
          },
        },
      ],
    };

    const context = createCovid19SolutionListPageContext({ manifest, data });

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the covid19 page with one solution with empty covid19 list', () => {
    const expectedContext = {
      ...defaultExpectedContext,
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          supplierName: 'Some supplier',
          covid19: {
            title: 'Some title',
            list: [],
          },
          viewSolutionUrl: '/solutions/covid19/00001',
        },
      ],
    };

    const data = {
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          supplier: {
            id: '1',
            name: 'Some supplier',
          },
          covid19: {
            title: 'Some title',
            list: [],
          },
        },
      ],
    };

    const context = createCovid19SolutionListPageContext({ manifest, data });

    expect(context).toEqual(expectedContext);
  });
});
