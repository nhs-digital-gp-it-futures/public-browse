import request from 'supertest';
import cheerio from 'cheerio';
import { testHarness } from '../test-utils/testHarness';
import content from './manifest.json';

const template = 'guide/template.njk';

describe('guide', () => {
  it('should render a backLink to the home page', (done) => {
    const context = content;
    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const homepageBackLink = $('[data-test-id="go-back-link"]');
        expect(homepageBackLink.length).toEqual(1);
        expect(homepageBackLink.text().trim()).toEqual('Go back to previous page');
        expect($(homepageBackLink).find('a').attr('href')).toEqual('/');
        done();
      });
  });

  it('should render the guide title, description and subtext', (done) => {
    const context = content;
    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const title = $('[data-test-id="guide-page-title"]');
        const description = $('[data-test-id="guide-page-description"]');
        const subtext = $('[data-test-id="guide-page-subtext"] > div');
        expect(title.length).toEqual(1);
        expect(title.text().trim()).toEqual(content.title);
        expect(description.length).toEqual(1);
        expect(description.text().trim()).toEqual(content.description);
        content.subtext.map((subtextEntry, i) => {
          expect(subtext.find(`div:nth-child(${i + 1})`).text().trim()).toEqual(subtextEntry);
        });
        done();
      });
  });

  it('should render a title, description and subsection for each section', (done) => {
    const context = content;
    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const title = $('[data-test-id="guide-section-title"]');
        const description = $('[data-test-id="guide-section-description"]');
        const subsection = $('[data-test-id="guide-section-subsection"]');
        expect(title.length).toEqual(content.sections.length);
        expect(subsection.length).toEqual(content.sections.length);
        content.sections.map((section, i) => {
          expect(title[i].children[0].data).toEqual(section.title);
          if (!section.description.href) {
            expect(description[i].children[0].data.trim()).toEqual(section.description);
          }
        });
        done();
      });
  });

  it('should render a a tag when description contains href', (done) => {
    const context = {
      sections: [{
        title: 'Catalogue Solution4',
        description: {
          startText: 'If you experience any technical issues when using this website, please contact NHS Digital’s Exeter Helpdesk at',
          linkText: 'exeter.helpdesk@nhs.net',
          href: 'mailto:exeter.helpdesk@nhs.net',
          endText: 'or call 0300 303 4034.',
        },
      }],
    };
    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const subsectionWithLink = $('[data-test-id="guide-section-description-with-link"]');
        const startText = subsectionWithLink.find('span:nth-child(1)');
        const endText = subsectionWithLink.find('span:nth-child(3)');
        const link = subsectionWithLink.find('a');
        expect(startText.text().trim()).toEqual(context.sections[0].description.startText.trim());
        expect(endText.text().trim()).toEqual(context.sections[0].description.endText.trim());
        expect(link.text().trim()).toEqual(context.sections[0].description.linkText.trim());
        expect(link.attr('href')).toEqual(context.sections[0].description.href.trim());
        done();
      });
  });
});
