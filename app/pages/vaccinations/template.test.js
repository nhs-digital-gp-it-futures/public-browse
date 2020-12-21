import { componentTester } from '../../test-utils/componentTester';

const setup = {
  template: {
    path: 'pages/vaccinations/template.njk',
  },
};

describe('vaccinations page', () => {
  it('should render the vaccinations page title', componentTester(setup, (harness) => {
    const context = {
      title: 'Covid-19 page title',
    };

    harness.request(context, ($) => {
      const vaccinationsTitle = $('[data-test-id="general-page-title"]');
      expect(vaccinationsTitle.length).toEqual(1);
      expect(vaccinationsTitle.text().trim()).toEqual(context.title);
    });
  }));

  it('should render vaccinations go back link', componentTester(setup, (harness) => {
    const context = {
      title: 'Covid-19 page title',
      backLinkPath: '/backlink/path',
    };

    harness.request(context, ($) => {
      const goBackLink = $('[data-test-id="go-back-link"] a');
      expect(goBackLink.length).toEqual(1);
      expect(goBackLink.text().trim()).toEqual('Go back to previous page');
      expect(goBackLink.attr('href')).toEqual(context.backLinkPath);
    });
  }));

  it('should render the vaccinations page description', componentTester(setup, (harness) => {
    const context = {
      pageDescription: 'Covid-19 page description',
    };

    harness.request(context, ($) => {
      const vaccinationsDescription = $('h2[data-test-id="general-page-description"]');
      expect(vaccinationsDescription.length).toEqual(1);
      expect(vaccinationsDescription.text().trim()).toEqual(context.pageDescription);
    });
  }));

  it('should render the vaccinations page inset text', componentTester(setup, (harness) => {
    const context = {
      insetText: [
        'some inset text 1',
        'some inset text 2',
        'some inset text 3',
      ],
    };

    harness.request(context, ($) => {
      const vaccinationsInsetText = $('[data-test-id="vaccinations-inset-text"]');
      const vaccinationsInsetTextParagraph = vaccinationsInsetText.find('p');
      expect(vaccinationsInsetTextParagraph.length).toEqual(3);
    });
  }));

  it('should render 0 vaccinations cards if no solutions are provided in the context', componentTester(setup, (harness) => {
    const context = {
      solutions: [],
    };

    harness.request(context, ($) => {
      const solutionCardsVaccinations = $('div[data-test-id="solution-cards-vaccinations"]').find('[data-test-id="solution-card-vaccinations"]');
      expect(solutionCardsVaccinations.length).toEqual(0);
    });
  }));

  it('should render 1 vaccinations card if 1 solution is provided in context', componentTester(setup, (harness) => {
    const context = {
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
        },
      ],
    };

    harness.request(context, ($) => {
      const solutionCardsVaccinations = $('div[data-test-id="solution-cards-vaccinations"]').find('[data-test-id="solution-card-vaccinations"]');
      expect(solutionCardsVaccinations.length).toEqual(1);
    });
  }));

  it('should render 3 vaccinations cards if 3 solutions are provided in context', componentTester(setup, (harness) => {
    const context = {
      filterType: 'vaccinations',
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
      const solutionCardsVaccinations = $('div[data-test-id="solution-cards-vaccinations"]').find('[data-test-id="solution-card-vaccinations"]');
      expect(solutionCardsVaccinations.length).toEqual(3);
    });
  }));
});
