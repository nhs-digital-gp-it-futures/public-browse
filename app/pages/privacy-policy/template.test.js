import { componentTester, snapshotTest } from '../../test-utils/componentTester';

const setup = {
  template: {
    path: 'pages/privacy-policy/template.njk',
  },
};

describe('home page', () => {
  it('should render the content', componentTester(setup, (harness) => {
    harness.request({}, ($) => {
      const snapshot = snapshotTest($, '[data-test-id="main-content"]');
      expect(snapshot).toMatchSnapshot();
    });
  }));
});
