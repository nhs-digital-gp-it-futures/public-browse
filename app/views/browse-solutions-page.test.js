import request from 'supertest';
import express from 'express';
import cheerio from 'cheerio';
import { App } from '../../app';

const createDummyApp = (context) => {
  const app = new App().createApp();

  const router = express.Router();
  const dummyRouter = router.get('/', (req, res) => {
    res.render('browse-solutions-page.njk', context);
  });

  app.use(dummyRouter);

  return app;
};

describe('browse solutions page', () => {
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

        expect(foundationSolutionsPromo.find('h3').text().trim()).toEqual('Browse Foundation Solutions');
        expect(foundationSolutionsPromo.find('p').text().trim()).toEqual('Brief outline of what browse foundation solutions are');
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

        expect(allSolutionsPromo.find('h3').text().trim()).toEqual('Browse All Solutions');
        expect(allSolutionsPromo.find('p').text().trim()).toEqual('Brief outline of what all solutions include and can be used for');
        expect(allSolutionsPromo.find('a').attr('href')).toEqual('/solutions');

        done();
      });
  });
});
