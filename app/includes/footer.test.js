import { componentTester, snapshotTest } from '../test-utils/componentTester';

const setup = {
  template: {
    path: 'includes/footer.njk',
  },
};

const footerLinks = [
  {
    label: 'Buyer\'s Guide',
    URL: '/guide',
  },
  {
    label: 'NHS Digital Helpdesk',
    URL: '/guide#contact-us',
  },
  {
    label: 'NHS Digital',
    URL: 'https://digital.nhs.uk/',
  },
  {
    label: 'About GP IT Futures',
    URL: 'https://digital.nhs.uk/services/future-gp-it-systems-and-services',
  },
  {
    label: 'Capabilities & Standards Model',
    URL: 'https://gpitbjss.atlassian.net/wiki/spaces/GPITF/overview',
  },
];

describe('footer', () => {
  it('should render the footer panel', componentTester(setup, (harness) => {
    const context = { footerLinks };

    harness.request(context, ($) => {
      const snapshot = snapshotTest($, '[data-test-id="footer-component"]');
      expect(snapshot).toMatchSnapshot();
    });
  }));

  it('should render the footer legal panel', componentTester(setup, (harness) => {
    const context = { showLegalPane: false };

    harness.request(context, ($) => {
      const snapshot = snapshotTest($, '[data-test-id="legal-panel"]');
      expect(snapshot).toMatchSnapshot();
    });
  }));
});
