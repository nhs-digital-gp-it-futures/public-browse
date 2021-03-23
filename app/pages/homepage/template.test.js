import { componentTester } from '../../test-utils/componentTester';

import content from './manifest.json';

const setup = {
  template: {
    path: 'pages/homepage/template.njk',
  },
};

describe('home page', () => {
  it('should render the homepage hero', componentTester(setup, (harness) => {
    const context = content;

    harness.request(context, ($) => {
      const homepageSection = $('[data-test-id="homepage-hero"]');
      const title = homepageSection.find('h1');
      const description = homepageSection.find('p');
      expect(homepageSection.length).toEqual(1);
      expect(title.text().trim()).toEqual(content.heroHeading);
      expect(description.text().trim()).toEqual(content.heroText);
    });
  }));

  it('should render the about us section', componentTester(setup, (harness) => {
    const context = content;

    harness.request(context, ($) => {
      const aboutUs = $('[data-test-id="about-us"]');
      expect(aboutUs.length).toEqual(1);
      expect(aboutUs.find('p').length).toEqual(3);
    });
  }));

  it('should render the guidance promo', componentTester(setup, (harness) => {
    const context = content;

    harness.request(context, ($) => {
      const promo = $('[data-test-id="guidance-promo"]');
      expect(promo.length).toEqual(1);
      expect(promo.find('a').attr('href')).toEqual('/guide');
      expect(promo.hasClass('nhsuk-grid-column-one-half')).toEqual(true);
      expect(promo.hasClass('nhsuk-card-group__item')).toEqual(true);

      expect(promo.find('h3').text().trim()).toEqual(content.guidePromoHeading);
      expect(promo.find('p').text().trim()).toEqual(content.guidePromoDescription);
    });
  }));

  it('should render the browse promo', componentTester(setup, (harness) => {
    const context = content;

    harness.request(context, ($) => {
      const promo = $('[data-test-id="browse-promo"]');
      expect(promo.length).toEqual(1);
      expect(promo.find('a').attr('href')).toEqual('/solutions');
      expect(promo.hasClass('nhsuk-grid-column-one-half')).toEqual(true);
      expect(promo.hasClass('nhsuk-card-group__item')).toEqual(true);
      expect(promo.find('h3').text().trim()).toEqual(content.viewSolutionsPromoHeading);
      expect(promo.find('p').text().trim()).toEqual(content.viewSolutionsPromoDescription);
    });
  }));

  it('should render the vaccinations promo', componentTester(setup, (harness) => {
    const context = content;

    harness.request(context, ($) => {
      const promo = $('[data-test-id="vaccinations-promo"]');
      expect(promo.length).toEqual(1);
      expect(promo.find('a').attr('href')).toEqual('/solutions/vaccinations');
      expect(promo.hasClass('nhsuk-grid-column-one-half')).toEqual(true);
      expect(promo.hasClass('nhsuk-card-group__item')).toEqual(true);
      expect(promo.find('h3').text().trim()).toEqual(content.vaccinationsPromoHeading);
      expect(promo.find('p').text().trim()).toEqual(content.vaccinationsPromoDescription);
    });
  }));

  it('should render the admin promo when showAdminTile is true', componentTester(setup, (harness) => {
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
      expect(promo.hasClass('nhsuk-card-group__item')).toEqual(true);
      expect(promo.find('h3').text().trim()).toEqual(content.adminPromoHeading);
      expect(promo.find('p').text().trim()).toEqual(content.adminPromoDescription);
      expect(promo.find('a').attr('href')).toEqual(context.adminUrl);
    });
  }));

  it('should not render the admin promo when showAdminTile is falsey', componentTester(setup, (harness) => {
    const context = content;

    harness.request(context, ($) => {
      const adminPromo = $('[data-test-id="admin-promo"]');
      expect(adminPromo.length).toEqual(0);
    });
  }));

  it('should not render the covid19 promo when the showCovid19 flag is not set', componentTester(setup, (harness) => {
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

  it('should render the order form promo when the showOrderForm flag is set', componentTester(setup, (harness) => {
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
      expect(orderFormPromo.hasClass('nhsuk-card-group__item')).toEqual(true);
      expect(orderFormPromo.find('h3').text().trim()).toEqual(content.orderFormPromoHeading);
      expect(orderFormPromo.find('p').text().trim()).toEqual(content.orderFormPromoDescription);
      expect(orderFormPromo.find('a').attr('href')).toEqual(context.orderFormUrl);
    });
  }));

  it('should not render the order form promo when the showOrderForm flag is not set', componentTester(setup, (harness) => {
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

  it('should render the DFOCVC Framework tile when the dfocvc flag is set', componentTester(setup, (harness) => {
    const context = {
      ...content,
      config: {
        showDfocvc: 'true',
      },
    };

    harness.request(context, ($) => {
      const card = $('[data-test-id="dfocvc-card"]');
      expect(card.length).toEqual(1);
      expect(card.hasClass('nhsuk-grid-column-one-half')).toEqual(true);
      expect(card.hasClass('nhsuk-card-group__item')).toEqual(true);
      expect(card.find('h3').text().trim()).toEqual(content.dfocvcHeading);
      expect(card.find('p').text().trim()).toEqual(content.dfocvcDescription);
      expect(card.find('a').attr('href')).toEqual('/solutions/dfocvc');
    });
  }));

  it('should not render the DFOCVC Framework tile when the dfocvc flag is not set', componentTester(setup, (harness) => {
    const context = {
      ...content,
      config: {
        showDfocvc: 'false',
      },
    };

    harness.request(context, ($) => {
      const card = $('[data-test-id="dfocvc-card"]');
      expect(card.length).toEqual(0);
    });
  }));
});
