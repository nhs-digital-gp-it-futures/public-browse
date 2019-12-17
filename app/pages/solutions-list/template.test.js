import request from 'supertest';
import cheerio from 'cheerio';
import { testHarness } from '../../test-utils/testHarness';

const template = 'pages/solutions-list/template.njk';

describe('solutions list page', () => {
  it('should render the solution list page title', (done) => {
    const context = {
      pageTitle: 'some page title',
    };
    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const solutionListTitle = $('[data-test-id="general-page-title"]');
        expect(solutionListTitle.length).toEqual(1);
        expect(solutionListTitle.text().trim()).toEqual(context.pageTitle);
        done();
      });
  });

  it('should render go back link', (done) => {
    const context = {
      pageTitle: 'some page title',
    };
    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const goBackLink = $('[data-test-id="go-back-link"] a');
        expect(goBackLink.length).toEqual(1);
        expect(goBackLink.text().trim()).toEqual('Go back to previous page');
        expect(goBackLink.attr('href')).toEqual('/solutions');

        done();
      });
  });

  it('should render the solution list page description', (done) => {
    const context = {
      pageDescription: 'some page description',
    };
    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const solutionListTitleSummary = $('div[data-test-id="general-page-description"]');
        expect(solutionListTitleSummary.length).toEqual(1);
        expect(solutionListTitleSummary.text().trim()).toEqual(context.pageDescription);
        done();
      });
  });

  describe('solution cards', () => {
    it('should render 0 cards if no solutions are provided in the context', (done) => {
      const context = {
        solutions: [],
      };
      const app = testHarness().createComponentDummyApp(template, context);
      request(app)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);
          const solutionCards = $('div[data-test-id="solution-cards"]').find('[data-test-id="solution-card"]');
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
      const app = testHarness().createComponentDummyApp(template, context);
      request(app)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);
          const solutionCards = $('div[data-test-id="solution-cards"]').find('[data-test-id="solution-card"]');
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
      const app = testHarness().createComponentDummyApp(template, context);
      request(app)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);
          const solutionCards = $('div[data-test-id="solution-cards"]').find('[data-test-id="solution-card"]');
          expect(solutionCards.length).toEqual(3);
          done();
        });
    });
  });
});
