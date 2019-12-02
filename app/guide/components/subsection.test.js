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

  it('should not render a title if not provided', (done) => {
    const newContext = { ...context };
    delete newContext.subSection.title;
    const app = testHarness().createTemplateDummyApp(macroWrapper, newContext);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="subsection-title"]').length).toEqual(0);
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

  it('should render a link within description if provided', (done) => {
    const testCaseContext = {
      subSection: {
        title: 'Additional Services',
        description: [
          {
            startText: 'You can learn more about the Capability Model',
            linkText: '[link]',
            href: 'https://www.nhs.uk/',
            endText: '',
          },
        ],
      },
    };
    const app = testHarness().createTemplateDummyApp(macroWrapper, testCaseContext);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const description = $('[data-test-id="subsection-description"]');
        const startText = description.find('span:nth-child(1)');
        const endText = description.find('span:nth-child(3)');
        const link = description.find('a');

        expect(endText.text().trim())
          .toEqual(testCaseContext.subSection.description[0].endText.trim());
        expect(startText.text().trim())
          .toEqual(testCaseContext.subSection.description[0].startText.trim());
        expect(link.text().trim())
          .toEqual(testCaseContext.subSection.description[0].linkText.trim());
        expect(link.attr('href'))
          .toEqual(testCaseContext.subSection.description[0].href.trim());

        done();
      });
  });

  it('should not render a description if not provided', (done) => {
    const newContext = { ...context };
    delete newContext.subSection.description;
    const app = testHarness().createTemplateDummyApp(macroWrapper, newContext);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="subsection-description"]').length).toEqual(0);
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

  it('should not render a bulletlist if not provided', (done) => {
    const newContext = { ...context };
    delete newContext.subSection.bulletlist;
    const app = testHarness().createTemplateDummyApp(macroWrapper, newContext);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="subsection-bullet-list"]').length).toEqual(0);
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

  it('should not render a footerDescription if not provided', (done) => {
    const newContext = { ...context };
    delete newContext.subSection.footerDescription;
    const app = testHarness().createTemplateDummyApp(macroWrapper, newContext);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="subsection-footer-description"]').length).toEqual(0);
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

  it('should not render a button if not provided', (done) => {
    const newContext = { ...context };
    delete newContext.subSection.button;
    const app = testHarness().createTemplateDummyApp(macroWrapper, newContext);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="subsection-button"]').length).toEqual(0);
        done();
      });
  });
});
