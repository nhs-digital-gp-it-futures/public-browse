import { createTestHarness } from '../test-utils/testHarness';

const setup = {
  template: {
    path: 'includes/header.njk',
  },
};

describe('header', () => {
  it('should render the terms banner with beta tag', createTestHarness(setup, (harness) => {
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

  it('should render the general terms link', createTestHarness(setup, (harness) => {
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


  it('should render the header banner', createTestHarness(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      const headerBanner = $('header[data-test-id="header-banner"]');
      expect(headerBanner.length).toEqual(1);
    });
  }));

  it('should render the login/logout component', createTestHarness(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      const headerBanner = $('header[data-test-id="header-banner"]');
      const loginLogout = headerBanner.find('[data-test-id="login-logout"]');
      // TODO: Add more test when login/logout component is functional
      expect(headerBanner.length).toEqual(1);
      expect(loginLogout.length).toEqual(1);
      expect(loginLogout.find('span').text().trim()).toEqual('Logged in as: <placeholder>');
      expect(loginLogout.find('a').text().trim()).toEqual('Log out');
      expect(loginLogout.find('a').attr('href')).toEqual('#');
    });
  }));
});
