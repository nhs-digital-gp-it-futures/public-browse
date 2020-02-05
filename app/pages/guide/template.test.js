import content from './manifest.json';
import { createTestHarness } from '../../test-utils/testHarness';

const setup = {
  template: {
    path: 'pages/guide/template.njk',
  },
};

describe('guide', () => {
  it('should render a backLink to the home page', createTestHarness(setup, (harness) => {
    const context = content;

    harness.request(context, ($) => {
      const goBacklLink = $('[data-test-id="go-back-link"]');
      expect(goBacklLink.length).toEqual(1);
      expect(goBacklLink.text().trim()).toEqual('Go back to homepage');
      expect($(goBacklLink).find('a').attr('href')).toEqual('/');
    });
  }));

  it('should render the guide title, description and subtext', createTestHarness(setup, (harness) => {
    const context = content;

    harness.request(context, ($) => {
      const title = $('[data-test-id="guide-page-title"]');
      const description = $('[data-test-id="guide-page-description"]');
      const subtext = $('[data-test-id="guide-page-subtext"] > div');
      expect(title.length).toEqual(1);
      expect(title.text().trim()).toEqual(content.title);
      expect(description.length).toEqual(1);
      expect(description.text().trim()).toEqual(content.description);
      content.subtext.map((subtextEntry, i) => {
        expect(subtext.find(`div:nth-child(${i + 1})`).text().trim()).toEqual(subtextEntry);
      });
    });
  }));

  it('should render a title, and subsection for each section', createTestHarness(setup, (harness) => {
    const context = content;

    harness.request(context, ($) => {
      const title = $('[data-test-id="guide-section-title"]');
      const subsection = $('[data-test-id="guide-section-subsection"]');
      expect(title.length).toEqual(content.sections.length);
      expect(subsection.length).toEqual(content.sections.length);
    });
  }));
});
