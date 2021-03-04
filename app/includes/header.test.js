import { componentTester } from '../test-utils/componentTester';

const cheerio = require('cheerio');

const setup = {
  template: {
    path: 'includes/header.njk',
  },
};

fdescribe('header', () => {
  it('should render the beta banner', componentTester(setup, (harness) => {
    harness.request({}, ($) => {
      expect($('[data-test-id="beta-banner"]').length).toEqual(1);
    });
  }));

  it('should render the beta banner to toMatchSnapshot', componentTester(setup, (harness) => {
    harness.request({}, ($) => {
      expect($('[data-test-id="beta-banner"]').html()).toMatchSnapshot();
    });
  }));

  fit('should render the header banner', componentTester(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      const headerBanner = $('header[data-test-id="header-banner"]');
      const html = cheerio.html($.root().html(headerBanner));
      expect(html).toMatchSnapshot();
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

    it('should render the covid19 global warning if feature flag set', componentTester(setup, (harness) => {
      const context = {
        config: {
          showCovid19: 'true',
        },
      };

      harness.request(context, ($) => {
        const globalAlert = $('[data-test-id="covid19-global-alert"]');
        const title = globalAlert.find('div').find('h2');
        const paragraph = globalAlert.find('div').find('p');
        const vaccinationsLink = paragraph.find('[data-test-id="vaccinations"]');
        const covid19Link = paragraph.find('[data-test-id="covid19"]');

        expect(globalAlert.hasClass('bc-c-global-alert')).toEqual(true);
        expect(title.text().trim()).toEqual('Coronavirus (COVID-19)');
        expect(paragraph.text().trim()).toEqual('View Catalogue Solutions that help with coronavirus by organising vaccinations or reducing visits to GP practices.');
        expect(vaccinationsLink.attr('href')).toEqual('/solutions/vaccinations');
        expect(covid19Link.attr('href')).toEqual('/solutions/covid19');
      });
    }));

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
