import request from 'supertest';
import express from 'express';
import nunjucks from 'nunjucks';
import cheerio from 'cheerio';
import { App } from '../../../app';

const createDummyApp = (context) => {
  const app = new App().createApp();

  const router = express.Router();
  const dummyRouter = router.get('/', (req, res) => {
    const macroWrapper = `{% from './components/tag.njk' import tag %}
                            {{ tag(qaIdentifier, text, classes) }}`;

    const viewToTest = nunjucks.renderString(macroWrapper, context);

    res.send(viewToTest);
  });

  app.use(dummyRouter);

  return app;
};

describe('foundation-tag', () => {
  it('should render the tag with the correct data-test-id', (done) => {
    const context = {
      qaIdentifier: 'qa-identifier',
    };
    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('div[data-test-id="qa-identifier-tag"]').length).toEqual(1);
        // expect(tag.hasClass('bc-c-tag')).toEqual(true);

        // const tag = $('.bc-c-tag');
        done();
      });
  });

  it('should render the tag with the correct text', (done) => {
    const context = {
      qaIdentifier: 'qa-identifier',
      text: 'some tag text',
    };
    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('div[data-test-id="qa-identifier-tag"]').text().trim()).toEqual('some tag text');
        done();
      });
  });

  it('should render the tag with the correct classes', (done) => {
    const context = {
      qaIdentifier: 'qa-identifier',
      text: 'some tag text',
      classes: 'extra-class',
    };
    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('div[data-test-id="qa-identifier-tag"]').hasClass('bc-c-tag')).toEqual(true);
        expect($('div[data-test-id="qa-identifier-tag"]').hasClass('extra-class')).toEqual(true);
        done();
      });
  });
});
