import { createTestHarness } from '../../../../../test-utils/testHarness';

const setup = {
  component: {
    name: 'covid19SolutionCard',
    path: 'pages/solutions-list/filterType/covid19/solution-card/covid19-solution-card.njk',
  },
};

describe('covid19-solution-card', () => {
  it('should render the covid19 tag', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        solution: {},
      },
    };

    harness.request(context, ($) => {
      const covid19SolutionIndicator = $('[data-test-id="solution-card-covid19-tag"]');
      expect(covid19SolutionIndicator.length).toEqual(1);
      expect(covid19SolutionIndicator.text().trim()).toEqual('Coronavirus');
    });
  }));

  it('should render the view this solution link', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        solution: {
          id: 'S1',
          viewSolutionUrl: '/solutions/covid19/S1',
        },
      },
    };

    harness.request(context, ($) => {
      const viewSolutionLink = $('[data-test-id="solution-card-view-link"]');
      expect(viewSolutionLink.length).toEqual(1);
      expect(viewSolutionLink.text().trim()).toEqual('View this solution');
      expect(viewSolutionLink.find('a').attr('href')).toEqual(`/solutions/covid19/${context.params.solution.id}`);
    });
  }));

  it('should render the supplier name', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        solution: {
          supplierName: 'some supplier name',
        },
      },
    };

    harness.request(context, ($) => {
      const solutionsupplierName = $('[data-test-id="solution-card-supplier"]');
      expect(solutionsupplierName.length).toEqual(1);
      expect(solutionsupplierName.text().trim()).toEqual('some supplier name');
    });
  }));

  it('should render the solution name', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        solution: {
          id: '0001',
          name: 'some solution name',
        },
      },
    };

    harness.request(context, ($) => {
      const solutionName = $('[data-test-id="solution-card-name"]');
      expect(solutionName.length).toEqual(1);
      expect(solutionName.text().trim()).toEqual('some solution name');
    });
  }));

  it('should have correct href when there is filterType key in context', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        solution: {
          id: '0001',
          name: 'some solution name',
          viewSolutionUrl: '/solutions/covid19/0001',
        },
      },
    };

    harness.request(context, ($) => {
      const solutionName = $('[data-test-id="solution-card-name"]');
      expect(solutionName.find('a').attr('href')).toEqual('/solutions/covid19/0001');
    });
  }));

  it('should render the solution summary', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        solution: {
          summary: 'some solution summary',
        },
      },
    };

    harness.request(context, ($) => {
      const solutionName = $('[data-test-id="solution-card-summary"]');

      expect(solutionName.length).toEqual(1);
      expect(solutionName.text().trim()).toEqual('some solution summary');
    });
  }));

  it('should render the solution covid19 title', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        solution: {
          covid19: {
            title: 'some covid19 title',
          },
        },
      },
    };

    harness.request(context, ($) => {
      const covid19Title = $('[data-test-id="solution-card-covid19-title"]');

      expect(covid19Title.length).toEqual(1);
      expect(covid19Title.text().trim()).toEqual('some covid19 title');
    });
  }));

  it('should render the solution covid19 description', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        solution: {
          covid19: {
            description: 'some covid19 description',
          },
        },
      },
    };

    harness.request(context, ($) => {
      const covid19Description = $('[data-test-id="solution-card-covid19-description"]');

      expect(covid19Description.length).toEqual(1);
      expect(covid19Description.text().trim()).toEqual('some covid19 description');
    });
  }));
});
