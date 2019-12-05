import request from 'supertest';
import cheerio from 'cheerio';
import { testHarness } from '../test-utils/testHarness';

const template = 'includes/header.njk';

describe('header', () => {
  it('should render the terms banner with beta tag', (done) => {
    const context = {};

    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
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

        done();
      });
  });

  it('should render the general terms link', (done) => {
    const context = {};

    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const generalTermsLink = $('[data-test-id="general-terms-link"]');

        expect(generalTermsLink.text().trim()).toEqual('downloading this PDF');
        expect(generalTermsLink.attr('href')).toEqual('https://gpitfuturessadev.blob.core.windows.net/$web/content/terms-of-use.pdf');

        done();
      });
  });


  it('should render the header banner', (done) => {
    const context = {};

    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const headerBanner = $('[data-test-id="header-banner"] > header');

        expect(headerBanner.hasClass('nhsuk-header--white')).toEqual(true);
        expect(headerBanner.text().trim()).toEqual('Digital');

        done();
      });
  });
});
