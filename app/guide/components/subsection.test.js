import request from 'supertest';
import cheerio from 'cheerio';
import { testHarness } from '../../test-utils/testHarness';

const context = {
  subSection: {
    title: 'Additional Services',
    description: [
      'Description sentence 1.',
      'Description sentence 2.',
      'Description sentence 3.',
    ],
    bulletlist: [
      'bullet 1',
      'bullet 2',
      'bullet 3',
    ],
    footerDescription: [
      'Footer description sentence 1.',
      'Footer description sentence 2.',
      'Footer description sentence 3.',
    ],
    button: {
      text: 'Download Buyer’s Guide PDF',
    },
  },
};

const macroWrapper = `{% from 'guide/components/subsection.njk' import subsection %}
{{ subsection(subSection) }}`;

describe('subsection', () => {
  it('should render a title if provided', (done) => {
    const app = testHarness().createTemplateDummyApp(macroWrapper, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="subsection-title"]').text().trim()).toEqual(context.subSection.title);
        done();
      });
  });

  it('should render a description if provided', (done) => {
    const app = testHarness().createTemplateDummyApp(macroWrapper, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const description = $('[data-test-id="subsection-description"]');
        context.subSection.description.forEach((descriptionText, i) => {
          expect(description.find(`div:nth-child(${i + 1})`).text().trim()).toEqual(descriptionText);
        });
        done();
      });
  });

  it('should render a bulletlist if provided', (done) => {
    const app = testHarness().createTemplateDummyApp(macroWrapper, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const bulletList = $('ul[data-test-id="subsection-bullet-list"]');
        context.subSection.bulletlist.map((bulletListText, i) => {
          expect(bulletList.find(`li:nth-child(${i + 1})`).text().trim()).toEqual(bulletListText);
        });
        done();
      });
  });

  it('should render a footerDescription if provided', (done) => {
    const app = testHarness().createTemplateDummyApp(macroWrapper, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const footerDescription = $('[data-test-id="subsection-footer-description"]');
        context.subSection.footerDescription.forEach((footerDescriptionText, i) => {
          expect(footerDescription.find(`div:nth-child(${i + 1})`).text().trim()).toEqual(footerDescriptionText);
        });
        done();
      });
  });

  it('should render a button if provided', (done) => {
    const app = testHarness().createTemplateDummyApp(macroWrapper, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="subsection-button"]').text().trim()).toEqual(context.subSection.button.text);
        done();
      });
  });
});
