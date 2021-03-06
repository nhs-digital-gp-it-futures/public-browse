import { componentTester } from '../../test-utils/componentTester';

import content from './manifest.json';

const setup = {
  template: {
    path: 'pages/browse-solutions/template.njk',
  },
};

describe('browse solutions page', () => {
  it('should render the view solution section', componentTester(setup, (harness) => {
    const context = content;

    harness.request(context, ($) => {
      const viewSolutionsTitle = $('[data-test-id="general-page-title"]');
      const viewSolutionsDescription = $('[data-test-id="general-page-description"]');

      expect(viewSolutionsTitle.length).toEqual(1);
      expect(viewSolutionsTitle.text().trim()).toEqual(content.title);
      expect(viewSolutionsDescription.length).toEqual(1);
      expect(viewSolutionsDescription.text().trim()).toEqual(content.description);
    });
  }));

  it('should render the browse foundation solutions promo', componentTester(setup, (harness) => {
    const context = content;

    harness.request(context, ($) => {
      const foundationSolutionsPromo = $('[data-test-id="foundation-solutions-promo"]');

      expect(foundationSolutionsPromo.length).toEqual(1);
      expect(foundationSolutionsPromo.hasClass('nhsuk-grid-column-one-half')).toEqual(true);
      expect(foundationSolutionsPromo.hasClass('nhsuk-card-group__item')).toEqual(true);

      expect(foundationSolutionsPromo.find('h3').text().trim()).toEqual(content.foundationPromoHeading);
      expect(foundationSolutionsPromo.find('p').text().trim()).toEqual(content.foundationPromoDescription);
      expect(foundationSolutionsPromo.find('a').attr('href')).toEqual('/solutions/foundation');
    });
  }));

  it('should render the browse all solutions promo', componentTester(setup, (harness) => {
    const context = content;

    harness.request(context, ($) => {
      const allSolutionsPromo = $('[data-test-id="all-solutions-promo"]');

      expect(allSolutionsPromo.length).toEqual(1);
      expect(allSolutionsPromo.hasClass('nhsuk-grid-column-one-half')).toEqual(true);
      expect(allSolutionsPromo.hasClass('nhsuk-card-group__item')).toEqual(true);

      expect(allSolutionsPromo.find('h3').text().trim()).toEqual(content.allPromoHeading);
      expect(allSolutionsPromo.find('p').text().trim()).toEqual(content.allPromoDescription);
      expect(allSolutionsPromo.find('a').attr('href')).toEqual('/solutions/capabilities-selector');
    });
  }));

  it('should render the compare promo', componentTester(setup, (harness) => {
    const context = content;

    harness.request(context, ($) => {
      const promo = $('[data-test-id="compare-promo"]');
      expect(promo.length).toEqual(1);
      expect(promo.find('a').attr('href')).toEqual('/solutions/compare');
      expect(promo.hasClass('nhsuk-grid-column-one-half')).toEqual(true);
      expect(promo.hasClass('nhsuk-card-group__item')).toEqual(true);
      expect(promo.find('h3').text().trim()).toEqual(content.comparePromoHeading);
      expect(promo.find('p').text().trim()).toEqual(content.comparePromoDescription);
    });
  }));

  it('should render go back link', componentTester(setup, (harness) => {
    const context = {
      ...content,
      title: 'some page title',
    };

    harness.request(context, ($) => {
      const goBackLink = $('[data-test-id="go-back-link"] a');

      expect(goBackLink.length).toEqual(1);
      expect(goBackLink.text().trim()).toEqual('Go back to previous page');
      expect(goBackLink.attr('href')).toEqual('./');
    });
  }));

  it('should render buyers guide information', componentTester(setup, (harness) => {
    const context = {
      ...content,
    };

    harness.request(context, ($) => {
      const moreInformation = $('div[data-test-id="browse-solutions-buyers-guide-information"] p');

      expect(moreInformation.length).toEqual(1);
      expect(moreInformation.text().trim()).toEqual("Find more information in our Buyer's Guide.");
    });
  }));

  it('should render buyers guide link', componentTester(setup, (harness) => {
    const context = {
      ...content,
    };

    harness.request(context, ($) => {
      const buyersGuideLink = $('a[data-test-id="buyers-guide-link"]');

      expect(buyersGuideLink.length).toEqual(1);
      expect(buyersGuideLink.text().trim()).toEqual("Buyer's Guide");
      expect(buyersGuideLink.attr('href')).toEqual('/guide');
    });
  }));
});
