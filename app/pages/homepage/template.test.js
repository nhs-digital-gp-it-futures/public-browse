import { createTestHarness } from '../../test-utils/testHarness';

import content from './manifest.json';

const setup = {
  template: {
    path: 'pages/homepage/template.njk',
  },
};

describe('home page', () => {
  it('should render the homepage hero', createTestHarness(setup, (harness) => {
    const context = content;

    harness.request(context, ($) => {
      const homepageSection = $('[data-test-id="homepage-hero"]');
      const title = homepageSection.find('h1');
      const description = homepageSection.find('h2');
      expect(homepageSection.length).toEqual(1);
      expect(title.text().trim()).toEqual(content.heroHeading);
      expect(description.text().trim()).toEqual(content.heroText);
    });
  }));

  it('should render the about us section', createTestHarness(setup, (harness) => {
    const context = content;

    harness.request(context, ($) => {
      const aboutUs = $('[data-test-id="about-us"]');
      expect(aboutUs.length).toEqual(1);
      expect(aboutUs.find('p').length).toEqual(3);
    });
  }));

  it('should render the guidance promo', createTestHarness(setup, (harness) => {
    const context = content;

    harness.request(context, ($) => {
      const guidancePromo = $('[data-test-id="guidance-promo"]');
      expect(guidancePromo.length).toEqual(1);
      expect(guidancePromo.hasClass('nhsuk-grid-column-one-half')).toEqual(true);
      expect(guidancePromo.hasClass('nhsuk-promo-group__item')).toEqual(true);
      expect(guidancePromo.hasClass('nhsuk-u-padding-left-0')).toEqual(true);
      expect(guidancePromo.find('> div').hasClass('nhsuk-u-margin-top-5')).toEqual(true);

      expect(guidancePromo.find('h3').text().trim()).toEqual(content.guidePromoHeading);
      expect(guidancePromo.find('p').text().trim()).toEqual(content.guidePromoDescription);
    });
  }));

  it('should render the browse promo', createTestHarness(setup, (harness) => {
    const context = content;

    harness.request(context, ($) => {
      const browsePromo = $('[data-test-id="browse-promo"]');
      expect(browsePromo.length).toEqual(1);
      expect(browsePromo.hasClass('nhsuk-grid-column-one-half')).toEqual(true);
      expect(browsePromo.hasClass('nhsuk-promo-group__item')).toEqual(true);
      expect(browsePromo.hasClass('nhsuk-u-padding-left-0')).toEqual(true);
      expect(browsePromo.find('> div').hasClass('nhsuk-u-margin-top-5')).toEqual(true);
      expect(browsePromo.find('h3').text().trim()).toEqual(content.viewSolutionsPromoHeading);
      expect(browsePromo.find('p').text().trim()).toEqual(content.viewSolutionsPromoDescription);
    });
  }));
});
