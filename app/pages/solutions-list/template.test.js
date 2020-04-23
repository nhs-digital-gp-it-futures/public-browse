import { createTestHarness } from '../../test-utils/testHarness';

const setup = {
  template: {
    path: 'pages/solutions-list/template.njk',
  },
};

describe('solutions list page', () => {
  it('should render the solution list page title', createTestHarness(setup, (harness) => {
    const context = {
      title: 'some page title',
    };

    harness.request(context, ($) => {
      const solutionListTitle = $('[data-test-id="general-page-title"]');
      expect(solutionListTitle.length).toEqual(1);
      expect(solutionListTitle.text().trim()).toEqual(context.title);
    });
  }));

  it('should render go back link', createTestHarness(setup, (harness) => {
    const context = {
      title: 'some page title',
      backLinkPath: '/backlink/path',
    };

    harness.request(context, ($) => {
      const goBackLink = $('[data-test-id="go-back-link"] a');
      expect(goBackLink.length).toEqual(1);
      expect(goBackLink.text().trim()).toEqual('Go back to previous page');
      expect(goBackLink.attr('href')).toEqual(context.backLinkPath);
    });
  }));

  it('should render the solution list page description', createTestHarness(setup, (harness) => {
    const context = {
      description: 'some page description',
    };

    harness.request(context, ($) => {
      const solutionListTitleSummary = $('h2[data-test-id="general-page-description"]');
      expect(solutionListTitleSummary.length).toEqual(1);
      expect(solutionListTitleSummary.text().trim()).toEqual(context.description);
    });
  }));

  it('should render the compare description if it is in the context', createTestHarness(setup, (harness) => {
    const context = {
      compareSolutionsDescription: 'some compare description',
    };

    harness.request(context, ($) => {
      const description = $('div[data-test-id="compare-solutions-description"]');
      expect(description.length).toEqual(1);
      expect(description.text().trim()).toEqual(context.compareSolutionsDescription);
    });
  }));

  it('should not render the compare description if it is not in the context', createTestHarness(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      const description = $('div[data-test-id="compare-solutions-description"]');
      expect(description.length).toEqual(0);
    });
  }));

  it('should render the compare button if compareSolutionsDescription is in the context', createTestHarness(setup, (harness) => {
    const context = {
      compareSolutionsDescription: 'some compare description',
      compareButtonText: 'compare button text',
    };

    harness.request(context, ($) => {
      const button = $('div[data-test-id="compare-button"] a');
      expect(button.length).toEqual(1);
      expect(button.text().trim()).toEqual(context.compareButtonText);
      expect(button.attr('href')).toEqual('/compare/document');
    });
  }));

  it('should not render the compare button if compareSolutionsDescription is not in the context', createTestHarness(setup, (harness) => {
    const context = {
      compareButtonText: 'compare button text',
    };

    harness.request(context, ($) => {
      const button = $('div[data-test-id="compare-button"] a');
      expect(button.length).toEqual(0);
    });
  }));

  describe('solution cards', () => {
    it('should render 0 cards if no solutions are provided in the context', createTestHarness(setup, (harness) => {
      const context = {
        solutions: [],
      };

      harness.request(context, ($) => {
        const solutionCards = $('div[data-test-id="solution-cards"]').find('[data-test-id="solution-card"]');
        expect(solutionCards.length).toEqual(0);
      });
    }));

    it('should render 1 card if only 1 solution is provided context', createTestHarness(setup, (harness) => {
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

    it('should render 3 cards if 3 solutions are provided in the context', createTestHarness(setup, (harness) => {
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
