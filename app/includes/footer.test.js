import request from 'supertest';
import cheerio from 'cheerio';
import { testHarness } from '../test-utils/testHarness';

const template = 'includes/footer.njk';

const content = {
  footerLinks: [
    {
      label: 'Buyer\'s Guide',
      URL: '/'
    },
    {
      label: 'NHS Digital service desk',
      URL: '/'
    },
    {
      label: 'NHS Digital',
      URL: 'https://digital.nhs.uk/'
    },
    {
      label: 'About GPIT Futures',
      URL: 'https://digital.nhs.uk/services/future-gp-it-systems-and-services'
    },
    {
      label: 'Capabilities and Standards Model',
      URL: 'https://gpitbjss.atlassian.net/wiki/spaces/GPITF/overview'
    },
  ],
};

describe('footer', () => {
  it('should render the footer panel', (done) => {
    const context = {};
    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const footer = $('[data-test-id="footer"]');
        expect(footer.length).toEqual(1);
        const footerComponent = footer.find('[data-test-id="footer-component"]');
        expect(footerComponent.length).toEqual(1);
        content.footerLinks.map((link, i) => {
          expect(footerComponent.find(`li:nth-child(${i + 1})`).text().trim()).toEqual(link.label);
        });
        done();
      });
  });

  it('should render the footer legal panel', (done) => {
    const context = {};
    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const footer = $('[data-test-id="footer"]');
        const legalPanel = footer.find('[data-test-id="legal-panel"]');
        expect(footer.length).toEqual(1);
        expect(legalPanel.length).toEqual(1);
        expect(legalPanel.find('span:nth-child(1)').text().trim()).toEqual('Legal');
        expect(legalPanel.find('span:nth-child(2)').text().trim()).toEqual('Privacy and cookies');
        done();
      });
  });
});
