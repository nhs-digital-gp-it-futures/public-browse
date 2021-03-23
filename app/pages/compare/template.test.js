import { componentTester, snapshotTest } from '../../test-utils/componentTester';
import { getContext } from './contextCreator';

const setup = {
  template: {
    path: 'pages/compare/template.njk',
  },
};

describe('compare page', () => {
  it('should render the content', componentTester(setup, (harness) => {
    harness.request(getContext(), ($) => {
      const snapshot = snapshotTest($, '[data-test-id="main-content"]');
      expect(snapshot).toMatchSnapshot();
    });
  }));
});
