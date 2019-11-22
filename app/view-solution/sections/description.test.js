import request from 'supertest';
import express from 'express';
import nunjucks from 'nunjucks';
import cheerio from 'cheerio';
import { App } from '../../../app';

const createDummyApp = (context) => {
  const app = new App().createApp();

  const router = express.Router();
  const dummyRouter = router.get('/', (req, res) => {
    const macroWrapper = `{% from 'view-solution/sections/description.njk' import viewSolutionDescription %}
                            {{ viewSolutionDescription(section) }}`;

    const viewToTest = nunjucks.renderString(macroWrapper, context);

    res.send(viewToTest);
  });

  app.use(dummyRouter);

  return app;
};

describe('description', () => {
  it('should render the title of the section', (done) => {
    const context = {
      section: {},
    };

    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('h3').text().trim()).toEqual('Solution description');

        done();
      });
  });

  it('should not render the solution-description section when not provided', (done) => {
    const context = {
    };

    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-solution-description"]').length).toEqual(0);

        done();
      });
  });

  describe('when there are answers provided for the questions', () => {
    it('should render the summary question title and data', (done) => {
      const context = {
        section: {
          answers: {
            summary: 'Some summary data',
          },
        },
      };

      const dummyApp = createDummyApp(context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const summaryQuestion = $('[data-test-id="view-section-question-summary"]');

          expect(summaryQuestion.find('[data-test-id="view-question-title"]').text().trim()).toEqual('Summary');
          expect(summaryQuestion.find('[data-test-id="view-question-data-text-summary"]').text().trim()).toEqual('Some summary data');

          done();
        });
    });

    it('should render the description question title and data', (done) => {
      const context = {
        section: {
          answers: {
            description: 'Some description data',
          },
        },
      };

      const dummyApp = createDummyApp(context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const descriptionQuestion = $('[data-test-id="view-section-question-description"]');

          expect(descriptionQuestion.find('[data-test-id="view-question-title"]').text().trim()).toEqual('About the solution');
          expect(descriptionQuestion.find('[data-test-id="view-question-data-text-description"]').text().trim()).toEqual('Some description data');

          done();
        });
    });

    it('should only render the link question as a link component', (done) => {
      const context = {
        section: {
          answers: {
            link: 'www.somelink.com',
          },
        },
      };

      const dummyApp = createDummyApp(context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const linkQuestion = $('[data-test-id="view-section-question-link"]');

          expect(linkQuestion.find('[data-test-id="view-question-title"]').length).toEqual(0);
          expect(linkQuestion.find('[data-test-id="view-question-data-link"]').text().trim()).toEqual('www.somelink.com');

          done();
        });
    });
  });

  describe('when there are no answers provided for the questions', () => {
    it('should not render the summary question title and data', (done) => {
      const context = {
        section: {
          answers: {
            summary: '',
          },
        },
      };

      const dummyApp = createDummyApp(context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const summaryQuestion = $('[data-test-id="view-section-question-summary"]');

          expect(summaryQuestion.length).toEqual(0);

          done();
        });
    });

    it('should not render the description question title and data', (done) => {
      const context = {
        section: {
          answers: {
            description: '',
          },
        },
      };

      const dummyApp = createDummyApp(context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const descriptionQuestion = $('[data-test-id="view-section-question-description"]');

          expect(descriptionQuestion.length).toEqual(0);

          done();
        });
    });

    it('should not render the solution link', (done) => {
      const context = {
        section: {
          answers: {
            link: '',
          },
        },
      };

      const dummyApp = createDummyApp(context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const linkQuestion = $('[data-test-id="view-section-question-link"]');

          expect(linkQuestion.length).toEqual(0);

          done();
        });
    });
  });
});
