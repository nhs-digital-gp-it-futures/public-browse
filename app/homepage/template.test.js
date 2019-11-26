import request from 'supertest';
import cheerio from 'cheerio';
import { testHarness } from '../test-utils/testHarness';
import content from './manifest.json';

const template = 'homepage/template.njk';

describe('home page', () => {
  it('should render the homepage hero', (done) => {
    const context = content;
    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const homepageSection = $('[data-test-id="homepage-hero"] > section');
        const title = homepageSection.find('h1');
        const description = homepageSection.find('p');
        expect(homepageSection.length).toEqual(1);
        expect(title.text().trim()).toEqual(content.heroHeading);
        expect(description.text().trim()).toEqual(content.heroText);
        done();
      });
  });

  it('should render the about us section', (done) => {
    const context = content;
    const app = testHarness().createComponentDummyApp(template, context);
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
    const context = content;
    const app = testHarness().createComponentDummyApp(template, context);
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

        expect(guidancePromo.find('h3').text().trim()).toEqual(content.guidePromoHeading);
        expect(guidancePromo.find('p').text().trim()).toEqual(content.guidePromoDescription);

        done();
      });
  });

  it('should render the browse promo', (done) => {
    const context = content;
    const app = testHarness().createComponentDummyApp(template, context);
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
        expect(browsePromo.find('h3').text().trim()).toEqual(content.viewSolutionsPromoHeading);
        expect(browsePromo.find('p').text().trim()).toEqual(content.viewSolutionsPromoDescription);
        done();
      });
  });
});
