import { ErrorContext } from 'buying-catalogue-library';
import { componentTester, snapshotTest } from '../../test-utils/componentTester';

const setup = {
  template: {
    path: 'pages/error/template.njk',
  },
};

describe('error page', () => {
  it('should render the content', componentTester(setup, (harness) => {
    harness.request(
      new ErrorContext({
        status: 404,
        backLinkHref: '/',
        backLinkText: 'Back',
        description: 'Document not found',
      }), ($) => {
        const snapshot = snapshotTest($, '[data-test-id="main-content"]');
        expect(snapshot).toMatchSnapshot();
      },
    );
  }));
});
