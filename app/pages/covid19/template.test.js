import { componentTester, snapshotTest } from '../../test-utils/componentTester';
import { getCovid19SolutionListPageContext } from './controller';

const setup = {
  template: {
    path: 'pages/covid19/template.njk',
  },
};

describe('covid19 page', () => {
  it('should render the content', componentTester(setup, (harness) => {
    harness.request(getCovid19SolutionListPageContext(), ($) => {
      const snapshot = snapshotTest($, '[data-test-id="main-content"]');
      expect(snapshot).toMatchSnapshot();
    });
  }));

  it('should render the covid19 page inset text', componentTester(setup, (harness) => {
    const context = {
      insetText: [
        'some inset text 1',
        'some inset text 2',
        'some inset text 3',
      ],
    };

    harness.request(context, ($) => {
      const covid19InsetText = $('[data-test-id="covid19-inset-text"]');
      const covid19InsetTextParagraph = covid19InsetText.find('p');
      expect(covid19InsetTextParagraph.length).toEqual(3);
    });
  }));

  it('should render 0 covid19 cards if no solutions are provided in the context', componentTester(setup, (harness) => {
    const context = {
      solutions: [],
    };

    harness.request(context, ($) => {
      const solutionCardsCovid19 = $('div[data-test-id="solution-cards-covid19"]').find('[data-test-id="solution-card-covid19"]');
      expect(solutionCardsCovid19.length).toEqual(0);
    });
  }));

  it('should render 1 covid19 card if 1 solution is provided in context', componentTester(setup, (harness) => {
    const context = {
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
        },
      ],
    };

    harness.request(context, ($) => {
      const solutionCardsCovid19 = $('div[data-test-id="solution-cards-covid19"]').find('[data-test-id="solution-card-covid19"]');
      expect(solutionCardsCovid19.length).toEqual(1);
    });
  }));

  it('should render 3 covid19 cards if 3 solutions are provided in context', componentTester(setup, (harness) => {
    const context = {
      filterType: 'covid19',
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
      const solutionCardsCovid19 = $('div[data-test-id="solution-cards-covid19"]').find('[data-test-id="solution-card-covid19"]');
      expect(solutionCardsCovid19.length).toEqual(3);
    });
  }));
});
