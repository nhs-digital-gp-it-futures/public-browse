import request from 'supertest';
import express from 'express';
import cheerio from 'cheerio';
import { App } from '../../app';

const createDummyApp = (context) => {
  const app = new App().createApp();

  const router = express.Router();
  const dummyRouter = router.get('/', (req, res) => {
    res.render('solutions-list-page.njk', context);
  });

  app.use(dummyRouter);

  return app;
};

describe('solutions list page', () => {
  it('should render the solution list page title', (done) => {
    const context = {};

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const solutionListTitle = $('[data-test-id="solutions-list-title"] h2');

        expect(solutionListTitle.length).toEqual(1);
        expect(solutionListTitle.text().trim()).toEqual('Browse Solutions - Search Results');

        done();
      });
  });

  it('should render the solution list page title summary', (done) => {
    const context = {};

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const solutionListTitleSummary = $('[data-test-id="solutions-list-title-summary"]');

        expect(solutionListTitleSummary.length).toEqual(1);
        expect(solutionListTitleSummary.text().trim()).toEqual('A lead paragraph is an introductory paragraph that you can use at the top of the page to summarise the context.');

        done();
      });
  });

  it('should render the solution list page title summary', (done) => {
    const context = {};

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const solutionListTitleSummary = $('[data-test-id="solutions-list-title-summary"]');

        expect(solutionListTitleSummary.length).toEqual(1);
        expect(solutionListTitleSummary.text().trim()).toEqual('A lead paragraph is an introductory paragraph that you can use at the top of the page to summarise the context.');

        done();
      });
  });

  describe('solution cards', () => {
    it('should render 0 cards if no solutions are provided in the context', (done) => {
      const context = {
        solutions: [],
      };

      const app = createDummyApp(context);
      request(app)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const solutionCards = $('[data-test-id="solution-cards"]').find('[data-test-id="solution-card"]');

          expect(solutionCards.length).toEqual(0);

          done();
        });
    });

    it('should render 1 card if only 1 solution is provided context', (done) => {
      const context = {
        solutions: [
          {
            id: '00001',
            name: 'The first solution',
          },
        ],
      };

      const app = createDummyApp(context);
      request(app)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const solutionCards = $('[data-test-id="solution-cards"]').find('[data-test-id="solution-card"]');

          expect(solutionCards.length).toEqual(1);

          done();
        });
    });

    it('should render 3 cards if 3 solutions are provided in the context', (done) => {
      const context = {
        solutions: [
          {
            id: '00001',
            name: 'The first solution',
          },
          {
            id: '00002',
            name: 'The second solution',
          },
          {
            id: '00003',
            name: 'The third solution',
          },
        ],
      };

      const app = createDummyApp(context);
      request(app)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const solutionCards = $('[data-test-id="solution-cards"]').find('[data-test-id="solution-card"]');

          expect(solutionCards.length).toEqual(3);

          done();
        });
    });
  });
});
