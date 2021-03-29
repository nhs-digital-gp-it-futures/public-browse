import { componentTester, snapshotTest } from '../test-utils/componentTester';
import manifest from './manifest.json';

const setup = {
  template: {
    path: 'includes/header.njk',
  },
};

describe('header', () => {
  it('should render the header', componentTester(setup, (harness) => {
    harness.request(manifest, ($) => {
      const snapshot = snapshotTest($, '[data-test-id="header-wrap"]');
      expect(snapshot).toMatchSnapshot();
    });
  }));

  describe('covid banner', () => {
    it('should render the covid19 global warning if feature flag set', componentTester(setup, (harness) => {
      const context = {
        config: {
          showCovid19: 'true',
        },
      };

      harness.request(context, ($) => {
        const globalAlert = $('[data-test-id="covid19-global-alert"]');
        expect(globalAlert.length).toEqual(1);
      });
    }));

    it('should not render the covid19 global warning if feature flag is not set', componentTester(setup, (harness) => {
      const context = {
        config: {
          showCovid19: false,
        },
      };

      harness.request(context, ($) => {
        const globalAlert = $('[data-test-id="covid19-global-alert"]');
        expect(globalAlert.length).toEqual(0);
      });
    }));

    it('should render the covid19 global warning without "coronavirus by organising..." text if showDfocvc flag is set to true', componentTester(setup, (harness) => {
      const context = {
        config: {
          showCovid19: 'true',
          showDfocvc: 'true',
        },
      };

      harness.request(context, ($) => {
        const globalAlert = $('[data-test-id="covid19-global-alert"]');
        const title = globalAlert.find('div').find('h2');
        const paragraph = globalAlert.find('div').find('p');
        const vaccinationsLink = paragraph.find('[data-test-id="vaccinations"]');

        expect(globalAlert.hasClass('bc-c-global-alert')).toEqual(true);
        expect(title.text().trim()).toEqual('Coronavirus (COVID-19)');
        expect(paragraph.text().trim()).toEqual('View Catalogue Solutions that help with coronavirus by organising vaccinations.');
        expect(vaccinationsLink.attr('href')).toEqual('/solutions/vaccinations');
      });
    }));
  });

  describe('login/logout component', () => {
    // TODO: LOGIN_ENABLED Remove describe block surrounding the tests below
    // when login is on by default
    describe('when login is enabled by default', () => {
      it('should not render the login component', componentTester(setup, (harness) => {
        const context = {
          loginEnabled: true,
        };
        harness.request(context, ($) => {
          const loginComponent = $('[data-test-id="login-logout-component"]');
          expect(loginComponent.length).toBe(1);
        });
      }));
    });

    // TODO: LOGIN_ENABLED Remove test below when login is on by default
    describe('when login is disabled by default', () => {
      it('should not render the login component', componentTester(setup, (harness) => {
        const context = {
          loginEnabled: false,
        };
        harness.request(context, ($) => {
          const loginComponent = $('[data-test-id="login-logout-component"]');
          expect(loginComponent.length).toBe(0);
        });
      }));
    });
  });
});
