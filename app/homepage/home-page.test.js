import request from 'supertest';
import express from 'express';
import cheerio from 'cheerio';
import { App } from '../../app';

const createDummyApp = (context) => {
  const app = new App().createApp();

  const router = express.Router();
  const dummyRouter = router.get('/', (req, res) => {
    res.render('home-page.njk', context);
  });

  app.use(dummyRouter);

  return app;
};


describe('home page', () => {
  it('should render the homepage hero', (done) => {
    const context = {};

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const homepageSection = $('[data-test-id="homepage-hero"] > section');
        const title = homepageSection.find('h1');
        const description = homepageSection.find('p');

        expect(homepageSection.length).toEqual(1);
        expect(title.text().trim()).toEqual('Buying Catalogue');
        expect(description.text().trim()).toEqual('The GP IT Futures procurement framework has replaced GP System of Choice (GPSoC). Use our Buying Catalogue to find out what high-quality IT systems and services are available.');

        done();
      });
  });

  it('should render the about us section', (done) => {
    const context = {};

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const aboutUs = $('[data-test-id="about-us"]');

        expect(aboutUs.length).toEqual(1);
        expect(aboutUs.find('p').length).toEqual(3);

        done();
      });
  });

  it('should render the guidance promo', (done) => {
    const context = {};

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const guidancePromo = $('[data-test-id="guidance-promo"]');

        expect(guidancePromo.length).toEqual(1);
        expect(guidancePromo.hasClass('nhsuk-grid-column-one-half')).toEqual(true);
        expect(guidancePromo.hasClass('nhsuk-promo-group__item')).toEqual(true);
        expect(guidancePromo.hasClass('nhsuk-u-padding-left-0')).toEqual(true);
        expect(guidancePromo.find('> div').hasClass('nhsuk-u-margin-top-5')).toEqual(true);

        expect(guidancePromo.find('h3').text().trim()).toEqual('Buying Catalogue Guide');
        expect(guidancePromo.find('p').text().trim()).toEqual('Our guide explains how to use the Buying Catalogue to find and procure clinical Solutions.');

        done();
      });
  });

  it('should render the browse promo', (done) => {
    const context = {};

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const browsePromo = $('[data-test-id="browse-promo"]');

        expect(browsePromo.length).toEqual(1);
        expect(browsePromo.hasClass('nhsuk-grid-column-one-half')).toEqual(true);
        expect(browsePromo.hasClass('nhsuk-promo-group__item')).toEqual(true);
        expect(browsePromo.hasClass('nhsuk-u-padding-left-0')).toEqual(true);
        expect(browsePromo.find('> div').hasClass('nhsuk-u-margin-top-5')).toEqual(true);

        expect(browsePromo.find('h3').text().trim()).toEqual('View Solutions');
        expect(browsePromo.find('p').text().trim()).toEqual('See what’s available on the GP IT Futures procurement framework that can meet your needs.');

        done();
      });
  });
});
