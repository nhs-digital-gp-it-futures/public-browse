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

  describe('covid19 list', () => {
    it('should render 0 in list if no items are provided in the context', createTestHarness(setup, (harness) => {
      const context = {
        params: {
          solution: {
            covid19: {
              list: [],
            },
          },
        },
      };

      harness.request(context, ($) => {
        const covid19List = $('[data-test-id="solution-card-covid19-list"]');

        expect(covid19List.length).toEqual(1);
        expect(covid19List.find('[data-test-id="covid19-list-item"]').length).toEqual(0);
      });
    }));

    it('should render 1 in list if only 1 item is provided in context', createTestHarness(setup, (harness) => {
      const context = {
        params: {
          solution: {
            covid19: {
              list: [
                'some list item',
              ],
            },
          },
        },
      };

      harness.request(context, ($) => {
        const covid19List = $('[data-test-id="solution-card-covid19-list"]');

        expect(covid19List.length).toEqual(1);
        expect(covid19List.find('[data-test-id="covid19-list-item"]').length).toEqual(1);
        expect(covid19List.find('[data-test-id="covid19-list-item"]:nth-child(1)').text().trim()).toEqual('some list item');
      });
    }));

    it('should render 3 item names if 3 capabilities are provided in the context', createTestHarness(setup, (harness) => {
      const context = {
        params: {
          solution: {
            covid19: {
              list: [
                'some first list item',
                'some second list item',
                'some third list item',
              ],
            },
          },
        },
      };

      harness.request(context, ($) => {
        const covid19List = $('[data-test-id="solution-card-covid19-list"]');

        expect(covid19List.length).toEqual(1);
        expect(covid19List.find('[data-test-id="covid19-list-item"]').length).toEqual(3);
        expect(covid19List.find('[data-test-id="covid19-list-item"]:nth-child(1)').text().trim()).toEqual('some first list item');
        expect(covid19List.find('[data-test-id="covid19-list-item"]:nth-child(2)').text().trim()).toEqual('some second list item');
        expect(covid19List.find('[data-test-id="covid19-list-item"]:nth-child(3)').text().trim()).toEqual('some third list item');
      });
    }));
  });
});
