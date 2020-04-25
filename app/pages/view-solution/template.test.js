import { componentTester } from '../../test-utils/componentTester';

const setup = {
  template: {
    path: 'pages/view-solution/template.njk',
  },
};

describe('view solution', () => {
  it('should render back-link component with correct href', componentTester(setup, (harness) => {
    const context = { };

    harness.request(context, ($) => {
      expect($('[data-test-id="view-solution-page-back-link"]').length).toEqual(1);
      expect($('[data-test-id="view-solution-page-back-link"]').find('a').attr('href')).toEqual('./');
    });
  }));

  it('should render the viewSolution component', componentTester(setup, (harness) => {
    const context = {
      solutionHeader: {
        id: '100000-001',
        name: 'Write on Time',
        supplierName: 'Really Kool Corporation',
        isFoundation: true,
        lastUpdated: '1996-03-15T10:00:00',
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="view-solution-header"]').length).toBe(1);
    });
  }));
});
