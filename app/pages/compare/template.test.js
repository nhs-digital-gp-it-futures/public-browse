import { createTestHarness } from '../../test-utils/testHarness';
import manifest from './manifest.json';

const setup = {
  template: {
    path: 'pages/compare/template.njk',
  },
};

const context = {
  ...manifest,
  compareButtonHref: 'a/href',
};

describe('compare page', () => {
  it('should render a backLink', createTestHarness(setup, (harness) => {
    harness.request(context, ($) => {
      const backlink = $('[data-test-id="go-back-link"]');
      expect(backlink.length).toEqual(1);
      expect(backlink.text().trim()).toEqual(manifest.backLinkText);
      expect($(backlink).find('a').attr('href')).toEqual('./');
    });
  }));

  it('should render a title', createTestHarness(setup, (harness) => {
    harness.request(context, ($) => {
      const title = $('h1[data-test-id="compare-page-title"]');
      expect(title.length).toEqual(1);
      expect(title.text().trim()).toEqual(manifest.title);
    });
  }));

  it('should render a description', createTestHarness(setup, (harness) => {
    harness.request(context, ($) => {
      const description = $('[data-test-id="compare-page-description"]');
      expect(description.length).toEqual(1);
      expect(description.text().trim()).toEqual(manifest.description);
    });
  }));

  it('should render a compare button', createTestHarness(setup, (harness) => {
    harness.request(context, ($) => {
      const button = $('[data-test-id="compare-button"] a');
      expect(button.length).toEqual(1);
      expect(button.text().trim()).toEqual(manifest.compareButtonText);
      expect(button.attr('href')).toEqual(context.compareButtonHref);
    });
  }));
});
