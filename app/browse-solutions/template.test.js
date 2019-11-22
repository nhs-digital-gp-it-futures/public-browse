import request from 'supertest';
import express from 'express';
import cheerio from 'cheerio';
import { App } from '../../app';

const createDummyApp = (context) => {
  const app = new App().createApp();

  const router = express.Router();
  const dummyRouter = router.get('/', (req, res) => {
    res.render('browse-solutions/template.njk', context);
  });

  app.use(dummyRouter);

  return app;
};

describe('browse solutions page', () => {
  it('should render the view solution section', (done) => {
    const context = {};

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const viewSolutionsTitle = $('[data-test-id="general-page-title"]');
        const viewSolutionsDescription = $('[data-test-id="general-page-description"]');

        expect(viewSolutionsTitle.length).toEqual(1);
        expect(viewSolutionsTitle.text().trim()).toEqual('View Solutions');
        expect(viewSolutionsDescription.length).toEqual(1);
        expect(viewSolutionsDescription.text().trim()).toEqual('There are two types of Solution on the Buying Catalogue. You can choose to view Foundation Solutions only, or all that are available.');
        done();
      });
  });

  it('should render the browse foundation solutions promo', (done) => {
    const context = {};

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const foundationSolutionsPromo = $('[data-test-id="foundation-solutions-promo"]');

        expect(foundationSolutionsPromo.length).toEqual(1);
        expect(foundationSolutionsPromo.hasClass('nhsuk-grid-column-one-half')).toEqual(true);
        expect(foundationSolutionsPromo.hasClass('nhsuk-promo-group__item')).toEqual(true);
        expect(foundationSolutionsPromo.hasClass('nhsuk-u-padding-left-0')).toEqual(true);
        expect(foundationSolutionsPromo.find('> div').hasClass('nhsuk-u-margin-top-5')).toEqual(true);

        expect(foundationSolutionsPromo.find('h3').text().trim()).toEqual('View Foundation Solutions');
        expect(foundationSolutionsPromo.find('p').text().trim()).toEqual('Find Solutions that meet the business needs of the Foundation Capabilities mandated by NHS England.');
        expect(foundationSolutionsPromo.find('a').attr('href')).toEqual('/solutions/foundation');

        done();
      });
  });

  it('should render the browse all solutions promo', (done) => {
    const context = {};

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const allSolutionsPromo = $('[data-test-id="all-solutions-promo"]');

        expect(allSolutionsPromo.length).toEqual(1);
        expect(allSolutionsPromo.hasClass('nhsuk-grid-column-one-half')).toEqual(true);
        expect(allSolutionsPromo.hasClass('nhsuk-promo-group__item')).toEqual(true);
        expect(allSolutionsPromo.hasClass('nhsuk-u-padding-left-0')).toEqual(true);
        expect(allSolutionsPromo.find('> div').hasClass('nhsuk-u-margin-top-5')).toEqual(true);

        expect(allSolutionsPromo.find('h3').text().trim()).toEqual('View all Solutions');
        expect(allSolutionsPromo.find('p').text().trim()).toEqual('Find out what Solutions the Buying Catalogue has to offer that can meet your needs.');
        expect(allSolutionsPromo.find('a').attr('href')).toEqual('/solutions/all');

        done();
      });
  });

  it('should render go back link', (done) => {
    const context = {
      pageTitle: 'some page title',
    };

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const goBackLink = $('[data-test-id="go-back-link"] a');

        expect(goBackLink.length).toEqual(1);
        expect(goBackLink.text().trim()).toEqual('Go back');
        expect(goBackLink.attr('href')).toEqual('/');

        done();
      });
  });
});
