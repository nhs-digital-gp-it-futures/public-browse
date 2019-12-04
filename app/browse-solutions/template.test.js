import request from 'supertest';
import cheerio from 'cheerio';
import { testHarness } from '../test-utils/testHarness';
import content from './manifest.json';

const template = 'browse-solutions/template.njk';

describe('browse solutions page', () => {
  it('should render the view solution section', (done) => {
    const context = content;

    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const viewSolutionsTitle = $('[data-test-id="general-page-title"]');
        const viewSolutionsDescription = $('[data-test-id="general-page-description"]');

        expect(viewSolutionsTitle.length).toEqual(1);
        expect(viewSolutionsTitle.text().trim()).toEqual(content.title);
        expect(viewSolutionsDescription.length).toEqual(1);
        expect(viewSolutionsDescription.text().trim()).toEqual(content.description[0]);
        done();
      });
  });

  it('should render the browse foundation solutions promo', (done) => {
    const context = content;

    const app = testHarness().createComponentDummyApp(template, context);
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

        expect(foundationSolutionsPromo.find('h3').text().trim()).toEqual(content.foundationPromoHeading);
        expect(foundationSolutionsPromo.find('p').text().trim()).toEqual(content.foundationPromoDescription);
        expect(foundationSolutionsPromo.find('a').attr('href')).toEqual('/solutions/foundation');

        done();
      });
  });

  it('should render the browse all solutions promo', (done) => {
    const context = content;

    const app = testHarness().createComponentDummyApp(template, context);
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

        expect(allSolutionsPromo.find('h3').text().trim()).toEqual(content.allPromoHeading);
        expect(allSolutionsPromo.find('p').text().trim()).toEqual(content.allPromoDescription);
        expect(allSolutionsPromo.find('a').attr('href')).toEqual('/solutions/all');

        done();
      });
  });

  it('should render go back link', (done) => {
    const context = {
      ...content,
      pageTitle: 'some page title',
    };

    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const goBackLink = $('[data-test-id="go-back-link"] a');

        expect(goBackLink.length).toEqual(1);
        expect(goBackLink.text().trim()).toEqual('Go back to previous page');
        expect(goBackLink.attr('href')).toEqual('/');

        done();
      });
  });

  it('should render buyers guide information', (done) => {
    const context = {
      ...content,
      pageTitle: 'some page title',
    };

    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const moreInformation = $('div[data-test-id="browse-solutions-buyers-guide-information"] p');

        expect(moreInformation.length).toEqual(1);
        expect(moreInformation.text().trim()).toEqual('Find more information in our Buyer\'s Guide.');

        done();
      });
  });

  it('should render buyers guide link', (done) => {
    const context = {
      ...content,
      pageTitle: 'some page title',
    };

    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const buyersGuideLink = $('a[data-test-id="buyers-guide-link"]');

        expect(buyersGuideLink.length).toEqual(1);
        expect(buyersGuideLink.text().trim()).toEqual('Buyer\'s Guide');
        expect(buyersGuideLink.attr('href')).toEqual('/guide');

        done();
      });
  });
});
