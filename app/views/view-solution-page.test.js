import request from 'supertest';
import express from 'express';
import cheerio from 'cheerio';
import { App } from '../../app';

const createDummyApp = (context) => {
  const app = new App().createApp();

  const router = express.Router();
  const dummyRouter = router.get('/', (req, res) => {
    res.render('view-solution-page.njk', context);
  });

  app.use(dummyRouter);

  return app;
};


describe('view solution', () => {
  it('should render the organisation name', (done) => {
    const context = {
      organisationName: 'Really Kool Corporation',
    };

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const orgName = $('[data-test-id="view-solution-page-organisation-name"]');
        expect(orgName.length).toEqual(1);
        expect(orgName.text().trim()).toEqual(context.organisationName);
        done();
      });
  });

  it('should render the solution name', (done) => {
    const context = {
      name: 'Write on Time',
    };

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const solutionName = $('[data-test-id="view-solution-page-solution-name"]');
        expect(solutionName.length).toEqual(1);
        expect(solutionName.text().trim()).toEqual(context.name);
        done();
      });
  });

  it('should render the solution description section', (done) => {
    const context = {
      sections: {
        'solution-description': {},
      },
    };
    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="view-solution-description"]').length).toEqual(1);
        done();
      });
  });
});
