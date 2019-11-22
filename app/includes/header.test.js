import request from 'supertest';
import express from 'express';
import cheerio from 'cheerio';
import { App } from '../../app';

const createDummyApp = (context) => {
  const app = new App().createApp();

  const router = express.Router();
  const dummyRouter = router.get('/', (req, res) => {
    res.render('includes/header.njk', context);
  });

  app.use(dummyRouter);

  return app;
};


describe('header', () => {
  it('should render the terms banner with beta tag', (done) => {
    const context = {};

    const app = createDummyApp(context);
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
        expect(termsBannerText.hasClass('bc-c-header-terms')).toEqual(true);
        expect(termsBannerText.text().trim()).toEqual('By using this site you are accepting the General Terms of Use and the Cookies Policy and Privacy Policy, each of which can be accessed through the links at the bottom of the page');

        const betaTag = $('[data-test-id="beta-tag"]');
        expect(betaTag.hasClass('bc-c-tag-beta')).toEqual(true);

        done();
      });
  });

  it('should render the general terms link', (done) => {
    const context = {};

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const generalTermsLink = $('[data-test-id="general-terms-link"]');

        expect(generalTermsLink.text().trim()).toEqual('General Terms of Use');
        expect(generalTermsLink.attr('href')).toEqual('https://gpitfuturesadev.blob.core.windows.net/$web/terms-of-use.pdf');

        done();
      });
  });


  it('should render the header banner', (done) => {
    const context = {};

    const app = createDummyApp(context);
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
