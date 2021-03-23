import { componentTester, snapshotTest } from '../../test-utils/componentTester';
import { getVaccinationsSolutionListPageContext } from './controller';

const setup = {
  template: {
    path: 'pages/vaccinations/template.njk',
  },
};

describe('vaccinations page', () => {
  it('should render the content', componentTester(setup, async (harness) => {
    const context = await getVaccinationsSolutionListPageContext();
    harness.request(context, ($) => {
      const snapshot = snapshotTest($, '[data-test-id="main-content"]');
      expect(snapshot).toMatchSnapshot();
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
