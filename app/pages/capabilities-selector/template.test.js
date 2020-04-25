import { componentTester } from '../../test-utils/componentTester';
import manifest from './manifest.json';

const setup = {
  template: {
    path: 'pages/capabilities-selector/template.njk',
  },
};

describe('capabilities-selector page', () => {
  it('should render a backLink to the solutions page', componentTester(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      const backLink = $('[data-test-id="go-back-link"]');
      expect(backLink.length).toEqual(1);
      expect(backLink.text().trim()).toEqual('Go back to previous page');
      expect(backLink.find('a').attr('href')).toEqual('./');
    });
  }));

  it('should render the title', componentTester(setup, (harness) => {
    const context = { ...manifest };

    harness.request(context, ($) => {
      const title = $('[data-test-id="capabilities-selector-page-title"]');
      expect(title.length).toEqual(1);
      expect(title.text().trim()).toEqual(manifest.title);
    });
  }));

  it('should render the description', componentTester(setup, (harness) => {
    const context = { ...manifest };

    harness.request(context, ($) => {
      const description = $('[data-test-id="capabilities-selector-page-description"]');
      expect(description.length).toEqual(1);
      expect(description.text().trim()).toEqual(manifest.description);
    });
  }));

  it('should render the capabilities selector', componentTester(setup, (harness) => {
    const context = {
      ...manifest,
      column1: [{
        reference: 'C5',
        version: '1.0.1',
        name: 'Appointments Management - GP',
        isFoundation: true,
      }],
    };

    harness.request(context, ($) => {
      const capabilitiesSelectorComponent = $('[data-test-id="capabilities-selector"]');
      expect(capabilitiesSelectorComponent.length).toEqual(1);
    });
  }));

  it('should render the button', componentTester(setup, (harness) => {
    const context = { ...manifest };

    harness.request(context, ($) => {
      const capabilitiesSelectorButton = $('[data-test-id="capabilities-selector-continue-button"]');

      expect(capabilitiesSelectorButton.length).toEqual(1);
      expect(capabilitiesSelectorButton.text().trim()).toEqual('Continue');
    });
  }));
});
