import { createTestHarness } from '../../test-utils/testHarness';
import manifest from './manifest.json';

const setup = {
  template: {
    path: 'pages/capability-selector/template.njk',
  },
};

describe('capability-selector page', () => {
  it('should render a backLink to the solutions page', createTestHarness(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      const homepageBackLink = $('[data-test-id="go-back-link"]');
      expect(homepageBackLink.length).toEqual(1);
      expect(homepageBackLink.text().trim()).toEqual('Go back to previous page');
      expect($(homepageBackLink).find('a').attr('href')).toEqual('/solutions');
    });
  }));

  it('should render the title', createTestHarness(setup, (harness) => {
    const context = { ...manifest };

    harness.request(context, ($) => {
      const title = $('[data-test-id="capability-selector-page-title"]');
      expect(title.length).toEqual(1);
      expect(title.text().trim()).toEqual(manifest.title);
    });
  }));

  it('should render the description', createTestHarness(setup, (harness) => {
    const context = { ...manifest };

    harness.request(context, ($) => {
      const description = $('[data-test-id="capability-selector-page-description"]');
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
      const capabilitySelectorComponent = $('[data-test-id="capability-selector"]');
      expect(capabilitySelectorComponent.length).toEqual(1);
    });
  }));

  it('should render the button', createTestHarness(setup, (harness) => {
    const context = { ...manifest };

    harness.request(context, ($) => {
      const capabilitySelectorButton = $('[data-test-id="capability-selector-continue-button"] a');
      expect(capabilitySelectorButton.length).toEqual(1);
      expect(capabilitySelectorButton.text().trim()).toEqual('Continue');
      expect(capabilitySelectorButton.attr('href')).toEqual('/');
    });
  }));
});
