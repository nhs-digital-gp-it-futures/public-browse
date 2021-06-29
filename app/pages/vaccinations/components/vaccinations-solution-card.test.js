import { componentTester } from '../../../test-utils/componentTester';

const setup = {
  component: {
    name: 'vaccinationsSolutionCard',
    path: 'pages/vaccinations/components/vaccinations-solution-card.njk',
  },
};

describe('vaccinations-solution-card', () => {
  it('should render the vaccinations tag', componentTester(setup, (harness) => {
    const context = {
      params: {
        solution: {},
      },
    };

    harness.request(context, ($) => {
      const vaccinationsSolutionIndicator = $('[data-test-id="solution-card-vaccinations-tag"]');
      expect(vaccinationsSolutionIndicator.length).toEqual(1);
      expect(vaccinationsSolutionIndicator.text().trim()).toEqual('Coronavirus vaccinations');
    });
  }));

  it('should render the view this solution link', componentTester(setup, (harness) => {
    const context = {
      params: {
        solution: {
          id: 'S1',
          name: 'solution name here',
          viewSolutionUrl: '/solutions/vaccinations/S1',
        },
      },
    };

    harness.request(context, ($) => {
      const viewSolutionLink = $('[data-test-id="solution-card-view-link"]');
      expect(viewSolutionLink.length).toEqual(1);
      expect(viewSolutionLink.text().trim()).toEqual(`View this solution for ${context.params.solution.name}`);
      expect(viewSolutionLink.find('a').attr('href')).toEqual(context.params.solution.viewSolutionUrl);
    });
  }));

  it('should render the view this solution link with span tag with class nhsuk-u-visually-hidden', componentTester(setup, (harness) => {
    const context = {
      params: {
        solution: {
          id: 'S1',
          viewSolutionUrl: '/solutions/vaccinations/S1',
        },
      },
    };

    harness.request(context, ($) => {
      const viewSolutionLink = $('[data-test-id="solution-card-view-link"]');
      const spanTag = viewSolutionLink.find('a').children()[0];

      expect(spanTag.name).toEqual('span');
      expect(spanTag.attribs.class).toEqual('nhsuk-u-visually-hidden');
    });
  }));

  it('should render the supplier name', componentTester(setup, (harness) => {
    const supplierName = 'some supplier name';
    const context = {
      params: {
        solution: {
          supplierName,
        },
      },
    };

    harness.request(context, ($) => {
      const solutionsupplierName = $('[data-test-id="solution-card-supplier"]');
      expect(solutionsupplierName.length).toEqual(1);
      expect(solutionsupplierName.text().trim()).toEqual(supplierName);
    });
  }));

  it('should render the solution name', componentTester(setup, (harness) => {
    const name = 'some solution name';
    const context = {
      params: {
        solution: {
          id: '0001',
          name,
        },
      },
    };

    harness.request(context, ($) => {
      const solutionName = $('[data-test-id="solution-card-name"]');
      expect(solutionName.length).toEqual(1);
      expect(solutionName.text().trim()).toEqual(name);
    });
  }));

  it('should render the solution summary', componentTester(setup, (harness) => {
    const summary = ['Some solution summary'];
    const context = {
      params: {
        solution: {
          summary,
        },
      },
    };

    harness.request(context, ($) => {
      const solutionName = $('[data-test-id="solution-card-summary"]');

      expect(solutionName.length).toEqual(1);
      expect(solutionName.text().trim()).toEqual(summary[0]);
    });
  }));

  it('should render the solution vaccinations title', componentTester(setup, (harness) => {
    const title = 'some vaccinations title';
    const context = {
      params: {
        solution: {
          vaccinations: {
            title,
          },
        },
      },
    };

    harness.request(context, ($) => {
      const vaccinationsTitle = $('[data-test-id="solution-card-vaccinations-title"]');

      expect(vaccinationsTitle.length).toEqual(1);
      expect(vaccinationsTitle.text().trim()).toEqual(title);
    });
  }));

  describe('vaccinations list', () => {
    it('should render 0 in list if no items are provided in the context', componentTester(setup, (harness) => {
      const context = {
        params: {
          solution: {
            vaccinations: {
              list: [],
            },
          },
        },
      };

      harness.request(context, ($) => {
        const vaccinationsList = $('[data-test-id="solution-card-vaccinations-list"]');

        expect(vaccinationsList.length).toEqual(1);
        expect(vaccinationsList.find('[data-test-id="vaccinations-list-item"]').length).toEqual(0);
      });
    }));

    it('should render 1 in list if only 1 item is provided in context', componentTester(setup, (harness) => {
      const list = [
        'some list item',
      ];
      const context = {
        params: {
          solution: {
            vaccinations: {
              list,
            },
          },
        },
      };

      harness.request(context, ($) => {
        const vaccinationsList = $('[data-test-id="solution-card-vaccinations-list"]');

        expect(vaccinationsList.length).toEqual(1);
        expect(vaccinationsList.find('[data-test-id="vaccinations-list-item"]').length).toEqual(1);
        expect(vaccinationsList.find('[data-test-id="vaccinations-list-item"]:nth-child(1)').text().trim()).toEqual(list[0]);
      });
    }));

    it('should render 3 item names if 3 capabilities are provided in the context', componentTester(setup, (harness) => {
      const list = [
        'some first list item',
        'some second list item',
        'some third list item',
      ];
      const context = {
        params: {
          solution: {
            vaccinations: {
              list,
            },
          },
        },
      };

      harness.request(context, ($) => {
        const vaccinationsList = $('[data-test-id="solution-card-vaccinations-list"]');

        expect(vaccinationsList.length).toEqual(1);
        expect(vaccinationsList.find('[data-test-id="vaccinations-list-item"]').length).toEqual(3);
        expect(vaccinationsList.find('[data-test-id="vaccinations-list-item"]:nth-child(1)').text().trim()).toEqual(list[0]);
        expect(vaccinationsList.find('[data-test-id="vaccinations-list-item"]:nth-child(2)').text().trim()).toEqual(list[1]);
        expect(vaccinationsList.find('[data-test-id="vaccinations-list-item"]:nth-child(3)').text().trim()).toEqual(list[2]);
      });
    }));
  });
});
