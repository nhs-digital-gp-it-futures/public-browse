import { createTestHarness } from '../../test-utils/testHarness';

const setup = {
  template: {
    path: 'pages/solutions-list/template.njk',
  },
};

describe('solutions list page', () => {
  it('should render the solution list page title', createTestHarness(setup, (harness) => {
    const context = {
      pageTitle: 'some page title',
    };

    harness.request(context, ($) => {
      const solutionListTitle = $('[data-test-id="general-page-title"]');
      expect(solutionListTitle.length).toEqual(1);
      expect(solutionListTitle.text().trim()).toEqual(context.pageTitle);
    });
  }));

  it('should render go back link', createTestHarness(setup, (harness) => {
    const context = {
      pageTitle: 'some page title',
      backLinkUrl: '/backlink/url',
    };

    harness.request(context, ($) => {
      const goBackLink = $('[data-test-id="go-back-link"] a');
      expect(goBackLink.length).toEqual(1);
      expect(goBackLink.text().trim()).toEqual('Go back to previous page');
      expect(goBackLink.attr('href')).toEqual(context.backLinkUrl);
    });
  }));

  it('should render the solution list page description', createTestHarness(setup, (harness) => {
    const context = {
      pageDescription: 'some page description',
    };

    harness.request(context, ($) => {
      const solutionListTitleSummary = $('div[data-test-id="general-page-description"]');
      expect(solutionListTitleSummary.length).toEqual(1);
      expect(solutionListTitleSummary.text().trim()).toEqual(context.pageDescription);
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
