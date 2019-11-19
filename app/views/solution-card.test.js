import request from 'supertest';
import express from 'express';
import nunjucks from 'nunjucks';
import cheerio from 'cheerio';
import { App } from '../../app';

const createDummyApp = (context) => {
  const app = new App().createApp();

  const router = express.Router();
  const dummyRouter = router.get('/', (req, res) => {
    const macroWrapper = `{% from './solution-card.njk' import solutionCard %}
                          {{ solutionCard(solution, backLinkPath) }}`;

    const viewToTest = nunjucks.renderString(macroWrapper, context);

    res.send(viewToTest);
  });

  app.use(dummyRouter);

  return app;
};

describe('solution-card', () => {
  it('should render the foundation indicator', (done) => {
    const context = {
      solution: {
        isFoundation: true,
      },
    };

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const foundationSolutionIndicator = $('[data-test-id="solution-card-foundation-tag"]');

        expect(foundationSolutionIndicator.length).toEqual(1);
        expect(foundationSolutionIndicator.text().trim()).toEqual('Foundation Solution');

        done();
      });
  });

  it('should render the view this solution link', (done) => {
    const context = {
      solution: {
        id: 'S1',
      },
    };

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const viewSolutionLink = $('[data-test-id="solution-card-view-link"]');

        expect(viewSolutionLink.length).toEqual(1);
        expect(viewSolutionLink.text().trim()).toEqual('View this solution');
        expect(viewSolutionLink.find('a').attr('href')).toEqual(`/view-solution/${context.solution.id}`);
        done();
      });
  });

  it('should render the organisation name', (done) => {
    const context = {
      solution: {
        organisationName: 'some organisation name',
      },
    };

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const solutionOrganisationName = $('[data-test-id="solution-card-organisation"]');

        expect(solutionOrganisationName.length).toEqual(1);
        expect(solutionOrganisationName.text().trim()).toEqual('some organisation name');

        done();
      });
  });

  describe('solution name', () => {
    it('should render the solution name', (done) => {
      const context = {
        solution: {
          id: '0001',
          name: 'some solution name',
        },
      };
      const app = createDummyApp(context);
      request(app)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);
          const solutionName = $('[data-test-id="solution-card-name"]');

          expect(solutionName.length).toEqual(1);
          expect(solutionName.text().trim()).toEqual('some solution name');
          done();
        });
    });

    it('should have correct href when there is no backLinkPath key in context', (done) => {
      const context = {
        solution: {
          id: '0001',
          name: 'some solution name',
        },
      };
      const app = createDummyApp(context);
      request(app)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);
          const solutionName = $('[data-test-id="solution-card-name"]');
          expect(solutionName.find('a').attr('href')).toEqual('/view-solution/0001');
          done();
        });
    });

    it('should have correct href when there is backLinkPath key in context', (done) => {
      const context = {
        solution: {
          id: '0001',
          name: 'some solution name',
        },
        backLinkPath: '?backlink=path',
      };
      const app = createDummyApp(context, '/solutions');
      request(app)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);
          const solutionName = $('[data-test-id="solution-card-name"]');
          expect(solutionName.find('a').attr('href')).toEqual('/view-solution/0001?backlink=path');
          done();
        });
    });
  });

  it('should render the solution summary', (done) => {
    const context = {
      solution: {
        summary: 'some solution summary',
      },
    };

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const solutionName = $('[data-test-id="solution-card-summary"]');

        expect(solutionName.length).toEqual(1);
        expect(solutionName.text().trim()).toEqual('some solution summary');

        done();
      });
  });

  describe('capability list', () => {
    it('should render 0 capability names if no capabilities are provided in the context', (done) => {
      const context = {
        solution: {
          capabilities: [],
        },
      };

      const app = createDummyApp(context);
      request(app)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const solutionCapabilityList = $('[data-test-id="solution-card-capability-list"]');
          const capabilityList = solutionCapabilityList.find('[data-test-id="capability-list"]');

          expect(solutionCapabilityList.length).toEqual(1);
          expect(capabilityList.length).toEqual(1);
          expect(capabilityList.find('[data-test-id="capability-list-item"]').length).toEqual(0);

          done();
        });
    });

    it('should render 1 capability name if only 1 capability is provided context', (done) => {
      const context = {
        solution: {
          capabilities: [
            'some capability name',
          ],
        },
      };

      const app = createDummyApp(context);
      request(app)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const solutionCapabilityList = $('[data-test-id="solution-card-capability-list"]');
          const capabilityList = solutionCapabilityList.find('[data-test-id="capability-list"]');

          expect(solutionCapabilityList.length).toEqual(1);
          expect(capabilityList.length).toEqual(1);
          expect(capabilityList.find('[data-test-id="capability-list-item"]').length).toEqual(1);
          expect(capabilityList.find('[data-test-id="capability-list-item"]:nth-child(1)').text().trim()).toEqual('some capability name');

          done();
        });
    });

    it('should render 3 capability names if 3 capabilities are provided in the context', (done) => {
      const context = {
        solution: {
          capabilities: [
            'first capability',
            'second capability',
            'third capability',
          ],
        },
      };

      const app = createDummyApp(context);
      request(app)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const solutionCapabilityList = $('[data-test-id="solution-card-capability-list"]');
          const capabilityList = solutionCapabilityList.find('[data-test-id="capability-list"]');

          expect(solutionCapabilityList.length).toEqual(1);
          expect(capabilityList.length).toEqual(1);
          expect(capabilityList.find('[data-test-id="capability-list-item"]').length).toEqual(3);
          expect(capabilityList.find('[data-test-id="capability-list-item"]:nth-child(1)').text().trim()).toEqual('first capability');
          expect(capabilityList.find('[data-test-id="capability-list-item"]:nth-child(2)').text().trim()).toEqual('second capability');
          expect(capabilityList.find('[data-test-id="capability-list-item"]:nth-child(3)').text().trim()).toEqual('third capability');

          done();
        });
    });
  });
});
