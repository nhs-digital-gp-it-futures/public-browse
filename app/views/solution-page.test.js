import request from 'supertest';
import express from 'express';
import cheerio from 'cheerio';
import { App } from '../../app';

const createDummyApp = (context) => {
  const app = new App().createApp();

  const router = express.Router();
  const dummyRouter = router.get('/', (req, res) => {
    res.render('solution-page.njk', context);
  });

  app.use(dummyRouter);

  return app;
};


describe('solution-page', () => {
  it('should render the page title', (done) => {
    const context = {};

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('h1').text().trim()).toEqual('View Solution');

        done();
      });
  });

  it('should render the page description message', (done) => {
    const context = {
      solution: {
        id: '00001',
        name: 'Some solution name',
      },
    };

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('.nhsuk-body-l').text().trim()).toEqual('Some solution name');

        done();
      });
  });

  describe('solution card', () => {
    it('should render the solution details', (done) => {
      const context = {
        solution: {
          id: '00001',
          name: 'Some solution name',
          sections: [
            {
              id: 'first-section',
              name: 'First Section',
              value: 'First Section Value',
              showTitle: true,
            },
          ],
        },
      };

      const app = createDummyApp(context);
      request(app)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const solutionCard = $('[data-test-id="full-solution-card"]');

          expect(solutionCard.length).toEqual(1);

          done();
        });
    });
  });
});
