import { createVaccinationsSolutionListPageContext } from './context';

import manifest from './manifest.json';

const defaultExpectedContext = {
  title: manifest.title,
  pageDescription: manifest.description,
  insetText: manifest.insetText,
  insetTextLink: manifest.insetTextLink,
  backLinkPath: '/',
  solutions: [],
};
const defaultSolution = {
  id: '00001',
  name: 'The first solution',
  summary: ['Some solution summary'],
};

describe('createVaccinationsSolutionListPageContext - vaccinations', () => {
  it('should create a context for the vaccinations page with one solution', () => {
    const expectedContext = {
      ...defaultExpectedContext,
      solutions: [
        {
          ...defaultSolution,
          supplierName: 'Some supplier',
          vaccinations: {
            title: 'Some title',
            list: [
              'First list item',
              'Second list item',
              'Second list item',
            ],
          },
          viewSolutionUrl: '/solutions/vaccinations/00001',
        },
      ],
    };

    const data = {
      solutions: [
        {
          ...defaultSolution,
          supplier: {
            id: '1',
            name: 'Some supplier',
          },
          vaccinations: {
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

    const context = createVaccinationsSolutionListPageContext({ manifest, data });

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the vaccinations page with one solution with empty vaccinations list', () => {
    const expectedContext = {
      ...defaultExpectedContext,
      solutions: [
        {
          ...defaultSolution,
          supplierName: 'Some supplier',
          vaccinations: {
            title: 'Some title',
            list: [],
          },
          viewSolutionUrl: '/solutions/vaccinations/00001',
        },
      ],
    };

    const data = {
      solutions: [
        {
          ...defaultSolution,
          supplier: {
            id: '1',
            name: 'Some supplier',
          },
          vaccinations: {
            title: 'Some title',
            list: [],
          },
        },
      ],
    };

    const context = createVaccinationsSolutionListPageContext({ manifest, data });

    expect(context).toEqual(expectedContext);
  });
});
