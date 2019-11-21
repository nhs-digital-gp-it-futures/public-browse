import request from 'supertest';
import express from 'express';
import nunjucks from 'nunjucks';
import cheerio from 'cheerio';
import { App } from '../../../app';

const createDummyApp = (context) => {
  const app = new App().createApp();

  const router = express.Router();
  const dummyRouter = router.get('/', (req, res) => {
    const macroWrapper = `{% from './components/general-page-description.njk' import generalPageDescription%}
                            {{ generalPageDescription(title, description) }}`;

    const viewToTest = nunjucks.renderString(macroWrapper, context);

    res.send(viewToTest);
  });

  app.use(dummyRouter);

  return app;
};

describe('general-page-description', () => {
  it('should render the title if provided', (done) => {
    const context = {
      title: 'a title',
    };

    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const title = $('[data-test-id="general-page-title"]');
        expect(title.length).toEqual(1);
        expect(title.text().trim()).toEqual('a title');
        done();
      });
  });

  it('should not render the title if not provided', (done) => {
    const context = {};

    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="general-page-title"]').length).toEqual(0);
        done();
      });
  });

  it('should render the description if provided', (done) => {
    const context = {
      description: ['a description'],
    };

    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const description = $('[data-test-id="general-page-description"]');
        expect(description.text().trim()).toEqual('a description');
        expect(description.length).toEqual(1);
        done();
      });
  });

  it('should render a div for each string in the description array', (done) => {
    const context = {
      description: ['a description', 'can be', 'separated out'],
    };

    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const description = $('[data-test-id="general-page-description"]');
        expect(description.find('div').length).toEqual(3);
        expect(description.find('div:nth-child(1)').text().trim()).toEqual('a description');
        expect(description.find('div:nth-child(2)').text().trim()).toEqual('can be');
        expect(description.find('div:nth-child(3)').text().trim()).toEqual('separated out');
        done();
      });
  });

  it('should not render the description if not provided', (done) => {
    const context = {};

    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="general-page-description"]').length).toEqual(0);
        done();
      });
  });
});
