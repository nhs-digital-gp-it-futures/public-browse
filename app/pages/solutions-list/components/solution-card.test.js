import { componentTester } from '../../../test-utils/componentTester';

const setup = {
  component: {
    name: 'solutionCard',
    path: 'pages/solutions-list/components/solution-card.njk',
  },
};

describe('solution-card', () => {
  it('should render the foundation tag if isFoundation is true', componentTester(setup, (harness) => {
    const context = {
      params: {
        solution: {
          isFoundation: true,
        },
      },
    };

    harness.request(context, ($) => {
      const foundationSolutionIndicator = $('[data-test-id="solution-card-foundation"]');
      expect(foundationSolutionIndicator.length).toEqual(1);
      expect(foundationSolutionIndicator.text().trim()).toEqual('Foundation Solution Set');
    });
  }));

  it('should not render the foundation tag if isFoundation is false', componentTester(setup, (harness) => {
    const context = {
      params: {
        solution: {
          isFoundation: false,
        },
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="solution-card-foundation-tag"]').length).toEqual(0);
    });
  }));

  it('should render the view this solution link', componentTester(setup, (harness) => {
    const context = {
      params: {
        solution: {
          id: 'S1',
          viewSolutionUrl: '/solutions/foundation/S1',
        },
      },
    };

    harness.request(context, ($) => {
      const viewSolutionLink = $('[data-test-id="solution-card-view-link"]');
      expect(viewSolutionLink.length).toEqual(1);
      expect(viewSolutionLink.text().trim()).toEqual('View this solution');
      expect(viewSolutionLink.find('a').attr('href')).toEqual(`/solutions/foundation/${context.params.solution.id}`);
    });
  }));

  it('should render the supplier name', componentTester(setup, (harness) => {
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

  describe('solution name', () => {
    it('should render the solution name', componentTester(setup, (harness) => {
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

    it('should have correct href when there is filterType key in context', componentTester(setup, (harness) => {
      const context = {
        params: {
          solution: {
            id: '0001',
            name: 'some solution name',
            viewSolutionUrl: '/solutions/foundation/0001',
          },
        },
      };

      harness.request(context, ($) => {
        const solutionName = $('[data-test-id="solution-card-name"]');
        expect(solutionName.find('a').attr('href')).toEqual('/solutions/foundation/0001');
      });
    }));
  });

  it('should render the solution summary', componentTester(setup, (harness) => {
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

  describe('capability list', () => {
    it('should render 0 capability names if no capabilities are provided in the context', componentTester(setup, (harness) => {
      const context = {
        params: {
          solution: {
            capabilities: [],
          },
        },
      };

      harness.request(context, ($) => {
        const solutionCapabilityList = $('[data-test-id="solution-card-capability-list"]');
        const capabilityList = solutionCapabilityList.find('[data-test-id="capability-list"]');

        expect(solutionCapabilityList.length).toEqual(1);
        expect(capabilityList.length).toEqual(1);
        expect(capabilityList.find('[data-test-id="capability-list-item"]').length).toEqual(0);
      });
    }));

    it('should render 1 capability name if only 1 capability is provided context', componentTester(setup, (harness) => {
      const context = {
        params: {
          solution: {
            capabilities: [
              'some capability name',
            ],
          },
        },
      };

      harness.request(context, ($) => {
        const solutionCapabilityList = $('[data-test-id="solution-card-capability-list"]');
        const capabilityList = solutionCapabilityList.find('[data-test-id="capability-list"]');

        expect(solutionCapabilityList.length).toEqual(1);
        expect(capabilityList.length).toEqual(1);
        expect(capabilityList.find('[data-test-id="capability-list-item"]').length).toEqual(1);
        expect(capabilityList.find('[data-test-id="capability-list-item"]:nth-child(1)').text().trim()).toEqual('some capability name');
      });
    }));

    it('should render 3 capability names if 3 capabilities are provided in the context', componentTester(setup, (harness) => {
      const context = {
        params: {
          solution: {
            capabilities: [
              'first capability',
              'second capability',
              'third capability',
            ],
          },
        },
      };

      harness.request(context, ($) => {
        const solutionCapabilityList = $('[data-test-id="solution-card-capability-list"]');
        const capabilityList = solutionCapabilityList.find('[data-test-id="capability-list"]');

        expect(solutionCapabilityList.length).toEqual(1);
        expect(capabilityList.length).toEqual(1);
        expect(capabilityList.find('[data-test-id="capability-list-item"]').length).toEqual(3);
        expect(capabilityList.find('[data-test-id="capability-list-item"]:nth-child(1)').text().trim()).toEqual('first capability');
        expect(capabilityList.find('[data-test-id="capability-list-item"]:nth-child(2)').text().trim()).toEqual('second capability');
        expect(capabilityList.find('[data-test-id="capability-list-item"]:nth-child(3)').text().trim()).toEqual('third capability');
      });
    }));
  });
});
