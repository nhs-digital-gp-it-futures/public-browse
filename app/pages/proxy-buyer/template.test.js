import { componentTester, snapshotTest } from '../../test-utils/componentTester';

const setup = {
  template: {
    path: 'pages/proxy-buyer/template.njk',
  },
};

describe('nominate organisation', () => {
  it('should render the content', componentTester(setup, (harness) => {
    harness.request({}, ($) => {
      const snapshot = snapshotTest($, '[data-test-id="main-content"]');
      expect(snapshot).toMatchSnapshot();
    });
  }));
});
