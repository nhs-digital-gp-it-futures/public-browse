import { componentTester, snapshotTest } from '../../test-utils/componentTester';
import { createCapabilitiesSelectorPageContext } from './capabilitiesSelectorPageContext';
import capabilitiesList from '../../test-utils/fixtures/capabilitiesList.json';

const setup = {
  template: {
    path: 'pages/capabilities-selector/template.njk',
  },
};

describe('capabilities-selector page', () => {
  it('should render the content', componentTester(setup, (harness) => {
    harness.request(createCapabilitiesSelectorPageContext(capabilitiesList), ($) => {
      const snapshot = snapshotTest($, '[data-test-id="main-content"]');
      expect(snapshot).toMatchSnapshot();
    });
  }));
});
