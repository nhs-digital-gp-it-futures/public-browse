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
      const promo = $('[data-test-id="guidance-promo"]');
      expect(promo.length).toEqual(1);
      expect(promo.find('a').attr('href')).toEqual('/guide');
      expect(promo.hasClass('nhsuk-grid-column-one-half')).toEqual(true);
      expect(promo.hasClass('nhsuk-promo-group__item')).toEqual(true);
      expect(promo.hasClass('nhsuk-u-padding-left-0')).toEqual(true);
      expect(promo.find('> div').hasClass('nhsuk-u-margin-top-5')).toEqual(true);

      expect(promo.find('h3').text().trim()).toEqual(content.guidePromoHeading);
      expect(promo.find('p').text().trim()).toEqual(content.guidePromoDescription);
    });
  }));

  it('should render the browse promo', createTestHarness(setup, (harness) => {
    const context = content;

    harness.request(context, ($) => {
      const promo = $('[data-test-id="browse-promo"]');
      expect(promo.length).toEqual(1);
      expect(promo.find('a').attr('href')).toEqual('/solutions');
      expect(promo.hasClass('nhsuk-grid-column-one-half')).toEqual(true);
      expect(promo.hasClass('nhsuk-promo-group__item')).toEqual(true);
      expect(promo.hasClass('nhsuk-u-padding-left-0')).toEqual(true);
      expect(promo.find('> div').hasClass('nhsuk-u-margin-top-5')).toEqual(true);
      expect(promo.find('h3').text().trim()).toEqual(content.viewSolutionsPromoHeading);
      expect(promo.find('p').text().trim()).toEqual(content.viewSolutionsPromoDescription);
    });
  }));

  it('should render the compare promo', createTestHarness(setup, (harness) => {
    const context = content;

    harness.request(context, ($) => {
      const promo = $('[data-test-id="compare-promo"]');
      expect(promo.length).toEqual(1);
      expect(promo.find('a').attr('href')).toEqual('/compare');
      expect(promo.hasClass('nhsuk-grid-column-one-half')).toEqual(true);
      expect(promo.hasClass('nhsuk-promo-group__item')).toEqual(true);
      expect(promo.hasClass('nhsuk-u-padding-left-0')).toEqual(true);
      expect(promo.find('> div').hasClass('nhsuk-u-margin-top-5')).toEqual(true);
      expect(promo.find('h3').text().trim()).toEqual(content.comparePromoHeading);
      expect(promo.find('p').text().trim()).toEqual(content.comparePromoDescription);
    });
  }));

  it('should render the admin promo when showAdminTile is true', createTestHarness(setup, (harness) => {
    const context = {
      ...content,
      showAdminTile: true,
      adminUrl: 'http://admin-page',
    };

    harness.request(context, ($) => {
      const promo = $('[data-test-id="admin-promo"]');
      expect(promo.length).toEqual(1);
      expect(promo.find('a').attr('href')).toEqual('http://admin-page');
      expect(promo.hasClass('nhsuk-grid-column-one-half')).toEqual(true);
      expect(promo.hasClass('nhsuk-promo-group__item')).toEqual(true);
      expect(promo.hasClass('nhsuk-u-padding-left-0')).toEqual(true);
      expect(promo.find('h3').text().trim()).toEqual(content.adminPromoHeading);
      expect(promo.find('p').text().trim()).toEqual(content.adminPromoDescription);
      expect(promo.find('a').attr('href')).toEqual(context.adminUrl);
    });
  }));

  it('should not render the admin promo when showAdminTile is falsey', createTestHarness(setup, (harness) => {
    const context = content;

    harness.request(context, ($) => {
      const adminPromo = $('[data-test-id="admin-promo"]');
      expect(adminPromo.length).toEqual(0);
    });
  }));

  it('should render the covid19 promo when the showCovid19 flag is set', createTestHarness(setup, (harness) => {
    const context = {
      ...content,
      config: {
        showCovid19: 'true',
      },
    };

    harness.request(context, ($) => {
      const promo = $('[data-test-id="covid19-promo"]');
      expect(promo.length).toEqual(1);
      expect(promo.find('a').attr('href')).toEqual('/solutions/covid19');
      expect(promo.hasClass('nhsuk-grid-column-one-half')).toEqual(true);
      expect(promo.hasClass('nhsuk-promo-group__item')).toEqual(true);
      expect(promo.hasClass('nhsuk-u-padding-left-0')).toEqual(true);
      expect(promo.find('> div').hasClass('nhsuk-u-margin-top-5')).toEqual(true);
      expect(promo.find('h3').text().trim()).toEqual(content.covid19PromoHeading);
      expect(promo.find('p').text().trim()).toEqual(content.covid19PromoDescription);
      expect(promo.find('a').attr('href')).toEqual('/solutions/covid19');
    });
  }));

  it('should not render the covid19 promo when the showCovid19 flag is not set', createTestHarness(setup, (harness) => {
    const context = {
      ...content,
      config: {
        showCovid19: 'false',
      },
    };

    harness.request(context, ($) => {
      const covid19Promo = $('[data-test-id="covid19-promo"]');
      expect(covid19Promo.length).toEqual(0);
    });
  }));

  it('should render the order form promo when the showOrderForm flag is set', createTestHarness(setup, (harness) => {
    const context = {
      ...content,
      orderFormUrl: 'http://localhost:3006',
      config: {
        showOrderForm: 'true',
      },
    };

    harness.request(context, ($) => {
      const orderFormPromo = $('[data-test-id="order-form-promo"]');
      expect(orderFormPromo.length).toEqual(1);
      expect(orderFormPromo.hasClass('nhsuk-grid-column-one-half')).toEqual(true);
      expect(orderFormPromo.hasClass('nhsuk-promo-group__item')).toEqual(true);
      expect(orderFormPromo.hasClass('nhsuk-u-padding-left-0')).toEqual(true);
      expect(orderFormPromo.find('> div').hasClass('nhsuk-u-margin-top-5')).toEqual(true);
      expect(orderFormPromo.find('h3').text().trim()).toEqual(content.orderFormPromoHeading);
      expect(orderFormPromo.find('p').text().trim()).toEqual(content.orderFormPromoDescription);
      expect(orderFormPromo.find('a').attr('href')).toEqual(context.orderFormUrl);
    });
  }));

  it('should not render the order form promo when the showOrderForm flag is not set', createTestHarness(setup, (harness) => {
    const context = {
      ...content,
      config: {
        showOrderForm: 'false',
      },
    };

    harness.request(context, ($) => {
      const orderFormPromo = $('[data-test-id="order-form-promo"]');
      expect(orderFormPromo.length).toEqual(0);
    });
  }));
});
