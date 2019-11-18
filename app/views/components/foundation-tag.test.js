import request from 'supertest';
import express from 'express';
import nunjucks from 'nunjucks';
import cheerio from 'cheerio';
import { App } from '../../../app';

const createDummyApp = (context) => {
  const app = new App().createApp();

  const router = express.Router();
  const dummyRouter = router.get('/', (req, res) => {
    const macroWrapper = `{% from './components/foundation-tag.njk' import foundationTag %}
                            {{ foundationTag('qaidentifier', isFoundation) }}`;

    const viewToTest = nunjucks.renderString(macroWrapper, context);

    res.send(viewToTest);
  });

  app.use(dummyRouter);

  return app;
};

describe('foundation-tag', () => {
  it('should render the foundation tag when isFoundation is true', (done) => {
    const context = {
      isFoundation: true,
    };
    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const foundationTag = $('[data-test-id="qaidentifier-foundation-tag"]');
        expect(foundationTag.length).toEqual(1);
        expect(foundationTag.hasClass('nhsuk-u-margin-bottom-6')).toEqual(true);
        expect(foundationTag.hasClass('bc-c-tag-foundation')).toEqual(true);
        expect(foundationTag.text().trim()).toEqual('Foundation Solution');
        done();
      });
  });

  it('should not render the foundation tag when isFoundation is false', (done) => {
    const context = {
      isFoundation: false,
    };
    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="qaidentifier-foundation-tag"]').length).toEqual(0);
        done();
      });
  });

  it('should not render the foundation tag when isFoundation is missing', (done) => {
    const context = {};
    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="qaidentifier-foundation-tag"]').length).toEqual(0);
        done();
      });
  });
});
