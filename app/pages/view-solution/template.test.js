import { componentTester, snapshotTest } from '../../test-utils/componentTester';
import publicSolutionWithData from '../../test-utils/fixtures/publicSolutionWithData.json';
import publicSolutionNoData from '../../test-utils/fixtures/publicSolutionNoData.json';

const setup = {
  template: {
    path: 'pages/view-solution/template.njk',
  },
};

describe('view solution', () => {
  it('should render the content with no data', componentTester(setup, async (harness) => {
    harness.request(publicSolutionNoData, ($) => {
      const snapshot = snapshotTest($, '[data-test-id="main-content"]');
      expect(snapshot).toMatchSnapshot();
    });
  }));

  it('should render the content with data', componentTester(setup, async (harness) => {
    harness.request(publicSolutionWithData, ($) => {
      const snapshot = snapshotTest($, '[data-test-id="main-content"]');
      expect(snapshot).toMatchSnapshot();
    });
  }));
});
