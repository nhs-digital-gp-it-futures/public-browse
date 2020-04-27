import { componentTester } from '../test-utils/componentTester';

const setup = {
  template: {
    path: 'includes/header.njk',
  },
};

describe('header', () => {
  it('should render the terms banner with beta tag', componentTester(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      const termsBanner = $('[data-test-id="terms-banner"] > div');
      expect(termsBanner.hasClass('nhsuk-u-margin-top-0')).toEqual(true);
      expect(termsBanner.hasClass('nhsuk-u-margin-bottom-0')).toEqual(true);
      expect(termsBanner.hasClass('nhsuk-u-padding-top-3')).toEqual(true);
      expect(termsBanner.hasClass('nhsuk-u-padding-bottom-3')).toEqual(true);
      expect(termsBanner.hasClass('nhsuk-u-padding-left-0')).toEqual(true);
      expect(termsBanner.hasClass('nhsuk-panel--grey')).toEqual(true);
      expect(termsBanner.hasClass('nhsuk-width-container')).toEqual(true);

      const termsBannerText = $('[data-test-id="terms-banner-text"]');
      expect(termsBannerText.text().trim()).toEqual('By using this site you are accepting the General Terms of Use which you can view by downloading this PDF. The Cookies Policy and Privacy Policy can be accessed using the links at the bottom of the page.');

      const betaTag = $('[data-test-id="beta-tag"]');
      expect(betaTag.hasClass('bc-c-tag-beta')).toEqual(true);
    });
  }));

  it('should render the general terms link', componentTester(setup, (harness) => {
    const context = {
      config: {
        blobstoreHost: 'www.some-blob-store.com',
      },
    };

    harness.request(context, ($) => {
      const generalTermsLink = $('[data-test-id="general-terms-link"]');

      expect(generalTermsLink.text().trim()).toEqual('downloading this PDF');
      expect(generalTermsLink.attr('href')).toEqual('www.some-blob-store.com/$web/content/terms-of-use.pdf');
    });
  }));

  it('should render the header banner', componentTester(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      const headerBanner = $('header[data-test-id="header-banner"]');
      expect(headerBanner.length).toEqual(1);
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
        const link = paragraph.find('a');

        expect(globalAlert.hasClass('bc-c-global-alert')).toEqual(true);
        expect(title.text().trim()).toEqual('Coronavirus (COVID-19)');
        expect(paragraph.text().trim()).toEqual('View Catalogue Solutions that can help prevent the spread of coronavirus.');
        expect(link.attr('href')).toEqual('/solutions/covid19');
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
