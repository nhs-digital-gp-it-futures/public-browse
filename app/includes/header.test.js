import { componentTester } from '../test-utils/componentTester';

const setup = {
  template: {
    path: 'includes/header.njk',
  },
};

describe('header', () => {
  it('should render the beta banner', componentTester(setup, (harness) => {
    harness.request({}, ($) => {
      expect($('[data-test-id="beta-banner"]').length).toEqual(1);
    });
  }));

  it('should render the header banner', componentTester(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      const headerBanner = $('header[data-test-id="header-banner"]');
      expect(headerBanner.length).toEqual(1);
    });
  }));

  it('should render logo with correct href and aria-label', componentTester(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      const logoLink = $('header[data-test-id="header-banner"] .nhsuk-header__logo a');
      expect(logoLink.length).toEqual(1);
      expect(logoLink.attr('href')).toEqual('/');
      expect(logoLink.attr('aria-label')).toEqual('Buying Catalogue Homepage');
    });
  }));

  describe('login/logout component', () => {
    // TODO: LOGIN_ENABLED Remove describe block surrounding the tests below
    // when login is on by default
    describe('when login is enabled by default', () => {
      describe('when username is provided', () => {
        it('should render username', componentTester(setup, (harness) => {
          const context = {
            username: 'user 1',
            loginEnabled: 'true',
          };
          harness.request(context, ($) => {
            const headerBanner = $('header[data-test-id="header-banner"]');
            const loginLogout = headerBanner.find('[data-test-id="login-logout-component"]');
            const loginLogoutText = loginLogout.find('span').text().trim().split(/\s\s+/);
            expect(loginLogoutText[0]).toEqual(`Logged in as: ${context.username}`);
          });
        }));

        it('should render logout link', componentTester(setup, (harness) => {
          const context = {
            username: 'user 1',
            loginEnabled: true,
          };
          harness.request(context, ($) => {
            const headerBanner = $('header[data-test-id="header-banner"]');
            const logoutLink = headerBanner.find('[data-test-id="login-logout-component"] a');
            expect(logoutLink.text().trim()).toEqual('Log out');
            expect(logoutLink.attr('href')).toEqual('/logout');
          });
        }));

        describe('when username is not provided', () => {
          it('should render login link', componentTester(setup, (harness) => {
            const context = {
              loginEnabled: true,
            };
            harness.request(context, ($) => {
              const headerBanner = $('header[data-test-id="header-banner"]');
              const loginLink = headerBanner.find('[data-test-id="login-logout-component"] a');
              expect(loginLink.text().trim()).toEqual('Log in');
              expect(loginLink.attr('href')).toEqual('/login');
            });
          }));
        });
      });
    });

    // TODO: LOGIN_ENABLED Remove test below when login is on by default
    describe('when login is disabled by default', () => {
      it('should not render the login component', componentTester(setup, (harness) => {
        const context = {
          loginEnabled: false,
        };
        harness.request(context, ($) => {
          const headerBanner = $('header[data-test-id="header-banner"]');
          const loginComponent = headerBanner.find('[data-test-id="login-logout-component"]');
          expect(loginComponent.length).toBe(0);
        });
      }));
    });

    it('should not render the covid19 global warning if feature flag is not set', componentTester(setup, (harness) => {
      const context = {
        config: {
          showCovid19: 'false',
        },
      };

      harness.request(context, ($) => {
        const globalAlert = $('[data-test-id="covid19-global-alert"]');
        expect(globalAlert.length).toEqual(0);
      });
    }));
  });
});
