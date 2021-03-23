import { componentTester, snapshotTest } from '../../test-utils/componentTester';
import { getHomepageContext } from './context';

const setup = {
  template: {
    path: 'pages/homepage/template.njk',
  },
};

describe('home page', () => {
  it('should render the content', componentTester(setup, (harness) => {
    harness.request(getHomepageContext({ user: {} }), ($) => {
      const snapshot = snapshotTest($, '[data-test-id="main-content"]');
      expect(snapshot).toMatchSnapshot();
    });
  }));

  it('should render the admin promo when showAdminTile is true', componentTester(setup, (harness) => {
    const context = {
      showAdminTile: true,
      adminUrl: 'http://admin-page',
    };

    harness.request(context, ($) => {
      const promo = $('[data-test-id="admin-promo"]');
      expect(promo.length).toEqual(1);
    });
  }));

  it('should not render the admin promo when showAdminTile is falsey', componentTester(setup, (harness) => {
    harness.request({}, ($) => {
      const adminPromo = $('[data-test-id="admin-promo"]');
      expect(adminPromo.length).toEqual(0);
    });
  }));

  it('should render the covid19 promo when the showCovid19 flag is set', componentTester(setup, (harness) => {
    const context = {
      config: {
        showCovid19: 'true',
      },
    };

    harness.request(context, ($) => {
      const promo = $('[data-test-id="covid19-promo"]');
      expect(promo.length).toEqual(1);
    });
  }));

  it('should not render the covid19 promo when the showCovid19 flag is not set', componentTester(setup, (harness) => {
    const context = {
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
      orderFormUrl: 'http://localhost:3006',
      config: {
        showOrderForm: 'true',
      },
    };

    harness.request(context, ($) => {
      const orderFormPromo = $('[data-test-id="order-form-promo"]');
      expect(orderFormPromo.length).toEqual(1);
    });
  }));

  it('should not render the order form promo when the showOrderForm flag is not set', componentTester(setup, (harness) => {
    const context = {
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
