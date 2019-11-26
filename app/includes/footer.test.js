import request from 'supertest';
import cheerio from 'cheerio';
import { testHarness } from '../test-utils/testHarness';

const template = 'includes/footer.njk';

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

        expect(footerComponent.find('li:nth-child(1)').text().trim()).toEqual("Buyer's Guide");
        expect(footerComponent.find('li:nth-child(2)').text().trim()).toEqual('NHS Digital service desk');
        expect(footerComponent.find('li:nth-child(3)').text().trim()).toEqual('NHS Digital');
        expect(footerComponent.find('li:nth-child(4)').text().trim()).toEqual('About GPIT Futures');
        expect(footerComponent.find('li:nth-child(5)').text().trim()).toEqual('Capabilities and Standards Model');

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
