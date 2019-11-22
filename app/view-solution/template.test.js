import request from 'supertest';
import express from 'express';
import cheerio from 'cheerio';
import { App } from '../../app';

const createDummyApp = (context) => {
  const app = new App().createApp();
  const router = express.Router();
  const dummyRouter = router.get('/', (req, res) => {
    res.render('view-solution/template.njk', context);
  });
  app.use(dummyRouter);
  return app;
};

describe('view solution', () => {
  it('should render back-link component with correct href', (done) => {
    const context = {};
    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="view-solution-page-back-link"]').length).toEqual(1);
        expect($('[data-test-id="view-solution-page-back-link"]').find('a').attr('href')).toEqual('./');
        done();
      });
  });

  it('should render the foundation tag if isFoundation is true', (done) => {
    const context = {
      isFoundation: true,
    };
    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="view-solution-foundation-tag"]').length).toEqual(1);
        done();
      });
  });

  it('should not render the foundation tag if isFoundation is false', (done) => {
    const context = {
      isFoundation: false,
    };
    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="solution-foundation-tag"]').length).toEqual(0);
        done();
      });
  });

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

  it('should render the solution id', (done) => {
    const context = {
      id: '111',
    };
    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const solutionId = $('[data-test-id="view-solution-page-solution-id"]');
        expect(solutionId.length).toEqual(1);
        expect(solutionId.text().trim()).toEqual(`Solution ID: ${context.id}`);
        done();
      });
  });

  it('should render the last updated', (done) => {
    const context = {
      lastUpdated: 'some time',
    };
    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const lastUpdated = $('[data-test-id="view-solution-page-last-updated"]');
        expect(lastUpdated.length).toEqual(1);
        expect(lastUpdated.text().trim()).toEqual(`Page last updated: ${context.lastUpdated}`);
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

  it('should render the solution capabilities section', (done) => {
    const context = {
      sections: {
        capabilities: {},
      },
    };
    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="view-solution-capabilities"]').length).toEqual(1);
        done();
      });
  });

  it('should render the solution contact details section', (done) => {
    const context = {
      sections: {
        'contact-details': {},
      },
    };
    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="view-solution-contact-details"]').length).toEqual(1);
        done();
      });
  });

  it('should render the download more information button', (done) => {
    const context = {
      downloadSolutionUrl: 'www.downloadurl.com',
    };
    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const moreInfoButton = $('[data-test-id="view-solution-page-download-info-button"] a');
        expect(moreInfoButton.length).toEqual(1);
        expect(moreInfoButton.text().trim()).toEqual('Download more information');
        expect(moreInfoButton.attr('href')).toEqual('www.downloadurl.com');
        done();
      });
  });
});
