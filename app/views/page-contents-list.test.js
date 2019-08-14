import request from 'supertest';
import express from 'express';
import nunjucks from 'nunjucks';
import cheerio from 'cheerio';
import { App } from '../../app';

const createDummyApp = (context) => {
  const app = new App().createApp();

  const router = express.Router();
  const dummyRouter = router.get('/', (req, res) => {
    const macroWrapper = `{% from './page-contents-list.njk' import pageContentsList %}
                          {{ pageContentsList(pageContents) }}`;

    const viewToTest = nunjucks.renderString(macroWrapper, context);

    res.send(viewToTest);
  });

  app.use(dummyRouter);

  return app;
};


describe('page-contents-list', () => {
  it('should render the title of page content', (done) => {
    const dummyApp = createDummyApp();
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('h4').text().trim()).toEqual('Page Contents');

        done();
      });
  });

  it('should not render a list of contents if the list provided is empty', (done) => {
    const context = {
      pageContents: [],
    };

    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const contentLists = $('li');

        expect(contentLists.length).toEqual(0);

        done();
      });
  });

  it('should render a list of one if the content list provided only contains one', (done) => {
    const context = {
      pageContents: [
        {
          href: '#description',
          text: 'Description',
        },
      ],
    };

    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const contentLists = $('li');

        expect(contentLists.length).toEqual(1);

        done();
      });
  });
});
