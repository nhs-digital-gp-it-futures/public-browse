import { componentTester, snapshotTest } from '../../test-utils/componentTester';
import { getSolutionListManifest } from './filterType/manifestProvider';

const setup = {
  template: {
    path: 'pages/solutions-list/template.njk',
  },
};

describe('solutions list page', () => {
  it('should render the content for foundation filter type', componentTester(setup, async (harness) => {
    const context = getSolutionListManifest('foundation');
    harness.request(context, ($) => {
      const snapshot = snapshotTest($, '[data-test-id="main-content"]');
      expect(snapshot).toMatchSnapshot();
    });
  }));

  it('should render the content for capabilities-selector filter type', componentTester(setup, async (harness) => {
    const context = getSolutionListManifest('capabilities-selector');
    harness.request(context, ($) => {
      const snapshot = snapshotTest($, '[data-test-id="main-content"]');
      expect(snapshot).toMatchSnapshot();
    });
  }));

  it('should render the compare description if it is in the context', componentTester(setup, (harness) => {
    const context = {
      compareSolutionsDescription: 'some compare description',
    };

    harness.request(context, ($) => {
      const description = $('div[data-test-id="compare-solutions-description"]');
      expect(description.length).toEqual(1);
    });
  }));

  it('should not render the compare description if it is not in the context', componentTester(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      const description = $('div[data-test-id="compare-solutions-description"]');
      expect(description.length).toEqual(0);
    });
  }));

  it('should render the compare button if compareSolutionsDescription is in the context', componentTester(setup, (harness) => {
    const context = {
      compareSolutionsDescription: 'some compare description',
      compareButtonText: 'compare button text',
    };

    harness.request(context, ($) => {
      const button = $('div[data-test-id="compare-button"] a');
      expect(button.length).toEqual(1);
    });
  }));

  it('should not render the compare button if compareSolutionsDescription is not in the context', componentTester(setup, (harness) => {
    const context = {
      compareButtonText: 'compare button text',
    };

    harness.request(context, ($) => {
      const button = $('div[data-test-id="compare-button"] a');
      expect(button.length).toEqual(0);
    });
  }));

  describe('solution cards', () => {
    it('should render 0 cards if no solutions are provided in the context', componentTester(setup, (harness) => {
      const context = {
        solutions: [],
      };

      harness.request(context, ($) => {
        const solutionCards = $('div[data-test-id="solution-cards"]').find('[data-test-id="solution-card"]');
        expect(solutionCards.length).toEqual(0);
      });
    }));

    it('should render 1 card if only 1 solution is provided context', componentTester(setup, (harness) => {
      const context = {
        solutions: [
          {
            id: '00001',
            name: 'The first solution',
          },
        ],
      };

      harness.request(context, ($) => {
        const solutionCards = $('div[data-test-id="solution-cards"]').find('[data-test-id="solution-card"]');
        expect(solutionCards.length).toEqual(1);
      });
    }));

    it('should render 3 cards if 3 solutions are provided in the context', componentTester(setup, (harness) => {
      const context = {
        solutions: [
          {
            id: '00001',
            name: 'The first solution',
          },
          {
            id: '00002',
            name: 'The second solution',
          },
          {
            id: '00003',
            name: 'The third solution',
          },
        ],
      };

      harness.request(context, ($) => {
        const solutionCards = $('div[data-test-id="solution-cards"]').find('[data-test-id="solution-card"]');
        expect(solutionCards.length).toEqual(3);
      });
    }));
  });
});
