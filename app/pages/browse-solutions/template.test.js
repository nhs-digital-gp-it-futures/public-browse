import { componentTester, snapshotTest } from '../../test-utils/componentTester';
import { getBrowseSolutionsPageContext } from './context';

const setup = {
  template: {
    path: 'pages/browse-solutions/template.njk',
  },
};

describe('browse solutions page', () => {
  it('should render the content', componentTester(setup, (harness) => {
    harness.request(getBrowseSolutionsPageContext(), ($) => {
      const snapshot = snapshotTest($, '[data-test-id="main-content"]');
      expect(snapshot).toMatchSnapshot();
    });
  }));
});
