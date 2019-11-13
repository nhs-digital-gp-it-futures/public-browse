import request from 'supertest';
import express from 'express';
import cheerio from 'cheerio';
import { App } from '../../../app';

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
  it('should render the header panel', (done) => {
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

        expect(termsBanner.text().trim()).toEqual('By using this website you are agreeing to abide by the terms of use which can be found some link. If you do not agree with these terms you should not use this website');

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
