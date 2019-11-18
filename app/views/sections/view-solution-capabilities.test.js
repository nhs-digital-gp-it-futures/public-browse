import request from 'supertest';
import express from 'express';
import nunjucks from 'nunjucks';
import cheerio from 'cheerio';
import { App } from '../../../app';

const createDummyApp = (context) => {
  const app = new App().createApp();

  const router = express.Router();
  const dummyRouter = router.get('/', (req, res) => {
    const macroWrapper = `{% from './sections/view-solution-capabilities.njk' import viewSolutionCapabilities %}
                            {{ viewSolutionCapabilities(section) }}`;

    const viewToTest = nunjucks.renderString(macroWrapper, context);

    res.send(viewToTest);
  });

  app.use(dummyRouter);

  return app;
};

describe('view-solution-capabilities', () => {
  it('should render the title of the section', (done) => {
    const context = {
      section: {},
    };

    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('h3').text().trim()).toEqual('Capabilities met');
        done();
      });
  });

  it('should not render the solution capabilities section when not provided', (done) => {
    const context = {
    };

    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-solution-capabilities"]').length).toEqual(0);
        done();
      });
  });

  it('should render the bullet list for each capability', (done) => {
    const capabilitiesMet = ['capability 1', 'capability 2', 'capability 3'];
    const context = {
      section: {
        answers: {
          'capabilities-met': capabilitiesMet,
        },
      },
    };

    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const capabilitiesMetList = $('[data-test-id="view-question-data-bulletlist"] li');

        expect(capabilitiesMetList.length).toEqual(3);
        done();
      });
  });
});
