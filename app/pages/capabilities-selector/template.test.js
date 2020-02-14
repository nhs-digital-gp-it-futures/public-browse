import { createTestHarness } from '../../test-utils/testHarness';
import manifest from './manifest.json';

const setup = {
  template: {
    path: 'pages/capabilities-selector/template.njk',
  },
};

describe('capabilities-selector page', () => {
  it('should render a backLink to the solutions page', createTestHarness(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      const backLink = $('[data-test-id="go-back-link"]');
      expect(backLink.length).toEqual(1);
      expect(backLink.text().trim()).toEqual('Go back to previous page');
      expect(backLink.find('a').attr('href')).toEqual('/solutions');
    });
  }));

  it('should render the title', createTestHarness(setup, (harness) => {
    const context = { ...manifest };

    harness.request(context, ($) => {
      const title = $('[data-test-id="capabilities-selector-page-title"]');
      expect(title.length).toEqual(1);
      expect(title.text().trim()).toEqual(manifest.title);
    });
  }));

  it('should render the description', createTestHarness(setup, (harness) => {
    const context = { ...manifest };

    harness.request(context, ($) => {
      const description = $('[data-test-id="capabilities-selector-page-description"]');
      expect(description.length).toEqual(1);
      expect(description.text().trim()).toEqual(manifest.description);
    });
  }));

  it('should render the capabilities selector', createTestHarness(setup, (harness) => {
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

  it('should render the button', createTestHarness(setup, (harness) => {
    const context = { ...manifest };

    harness.request(context, ($) => {
      const capabilitiesSelectorButton = $('[data-test-id="capabilities-selector-continue-button"] a');
      expect(capabilitiesSelectorButton.length).toEqual(1);
      expect(capabilitiesSelectorButton.text().trim()).toEqual('Continue');
      expect(capabilitiesSelectorButton.attr('href')).toEqual('/');
    });
  }));
});
