import request from 'supertest';
import { createReadStream, readFileSync } from 'fs';
import path from 'path';
import { FakeAuthProvider, getDocument } from 'buying-catalogue-library';
import { App } from './app';
import { routes } from './routes';
import { getCsrfTokenFromGet } from './test-utils/helper';
import * as homepageContext from './pages/homepage/context';
import * as viewSolutionController from './pages/view-solution/controller';
import * as solutionListPageContext from './pages/solutions-list/controller';
import * as capabilitiesContext from './pages/capabilities-selector/controller';
import * as browseSolutionsPageContext from './pages/browse-solutions/context';
import * as guidePageContext from './pages/guide/context';
import * as comparePageContext from './pages/compare/controller';
import config from './config';
import { logger } from './logger';

jest.mock('./logger');

const mockFoundationSolutionsContext = {
  title: 'Foundation',
  pageDescription: 'These foundation solutions',
  solutions: [],
};

const mockFilteredSolutions = {
  title: 'Custom',
  pageDescription: 'These are solutions which match the selected capabilities',
  solutions: [],
};

const mockGetPublicSolutionById = {
  solutionHeader: {
    id: '100000-001',
    name: 'Write on Time',
    supplierName: 'Really Kool Corporation',
    isFoundation: true,
  },
  id: '100000-001',
  name: 'Write on Time',
  supplierName: 'Really Kool Corporation',
  isFoundation: true,
  sections: {},
};

const mockCapabilitiesContext = {
  capabilities: {
    title: 'Catalogue Solutions – Capabilities selector',
    description: 'Description of selector',
    column1: [{
      text: 'Appointments Management - GP',
      value: 'C5',
    }],
    column2: [{
      text: 'Prescribing',
      value: 'C14',
    }],
  },
};

const mockLogoutMethod = jest.fn().mockImplementation(() => Promise.resolve({}));

const setUpFakeApp = () => {
  const authProvider = new FakeAuthProvider(mockLogoutMethod);
  const app = new App(authProvider).createApp();
  app.use('/', routes(authProvider));
  return app;
};

describe('routes', () => {
  // TODO: USE_CAPABILITIES_SELECTOR Remove beforeEach when capabilities selector is on by default
  beforeEach(() => {
    config.useCapabilitiesSelector = 'true';
  });

  describe('GET /back-from-admin', () => {
    it('should return the correct status and redirect to the login route', () => (
      request(setUpFakeApp())
        .get('/back-from-admin')
        .expect(302)
        .then((res) => {
          expect(res.headers.location).toEqual('http://identity-server/login');
        })));
  });

  describe('GET /', () => {
    afterEach(() => {
      homepageContext.getHomepageContext.mockReset();
    });

    it('should return the correct status and text if there is no error', () => {
      homepageContext.getHomepageContext = jest.fn()
        .mockImplementation(() => Promise.resolve({}));

      return request(setUpFakeApp())
        .get('/')
        .expect(200)
        .then((res) => {
          expect(res.text.includes('<div class="nhsuk-hero" data-test-id="homepage-hero">')).toEqual(true);
          expect(res.text.includes('data-test-id="error-title"')).toEqual(false);
        });
    });
  });

  describe('GET /guide', () => {
    afterEach(() => {
      guidePageContext.getGuidePageContext.mockReset();
    });

    it('should return the correct status and text if there is no error', () => {
      guidePageContext.getGuidePageContext = jest.fn()
        .mockImplementation(() => Promise.resolve({}));

      return request(setUpFakeApp())
        .get('/guide')
        .expect(200)
        .then((res) => {
          expect(res.text.includes('data-test-id="guide-page-body"')).toEqual(true);
          expect(res.text.includes('data-test-id="error-title"')).toEqual(false);
        });
    });
  });

  describe('GET /solutions/compare', () => {
    afterEach(() => {
      comparePageContext.getContext.mockReset();
    });

    it('should return the correct status and text if there is no error', () => {
      comparePageContext.getContext = jest.fn()
        .mockImplementation(() => Promise.resolve({}));

      return request(setUpFakeApp())
        .get('/solutions/compare')
        .expect(200)
        .then((res) => {
          expect(res.text.includes('data-test-id="compare-page-title"')).toEqual(true);
          expect(res.text.includes('data-test-id="error-title"')).toEqual(false);
        });
    });
  });

  describe('GET /solutions/compare/document', () => {
    it('should call getDocument with the correct params', () => {
      getDocument.mockResolvedValue({ data: createReadStream(path.resolve(__dirname, 'data.pdf')) });
      request(setUpFakeApp())
        .get('/solutions/compare/document')
        .expect(200)
        .then(() => {
          expect(getDocument.mock.calls.length).toEqual(1);
          expect(getDocument).toHaveBeenCalledWith({
            endpoint: `${config.documentApiHost}/api/v1/documents/compare-solutions.xlsx`,
            logger,
          });
          getDocument.mockRestore();
        });
    });
  });

  describe('GET /solutions', () => {
    afterEach(() => {
      browseSolutionsPageContext.getBrowseSolutionsPageContext.mockReset();
    });

    it('should return the correct status and text if there is no error', () => {
      browseSolutionsPageContext.getBrowseSolutionsPageContext = jest.fn()
        .mockImplementation(() => Promise.resolve({}));

      return request(setUpFakeApp())
        .get('/solutions')
        .expect(200)
        .then((res) => {
          expect(res.text.includes('data-test-id="browse-solutions"')).toEqual(true);
          expect(res.text.includes('data-test-id="error-title"')).toEqual(false);
        });
    });
  });

  describe('GET /solutions/:filterType.:capabilities?', () => {
    afterEach(() => {
      solutionListPageContext.getSolutionListPageContext.mockReset();
    });

    it('should return the correct status and text if there is no error for foundation', () => {
      solutionListPageContext.getSolutionListPageContext = jest.fn()
        .mockImplementation(() => Promise.resolve(mockFoundationSolutionsContext));

      return request(setUpFakeApp())
        .get('/solutions/foundation')
        .expect(200)
        .then((res) => {
          expect(res.text.includes('data-test-id="solutions-list-body"')).toEqual(true);
          expect(res.text.includes('data-test-id="error-title"')).toEqual(false);
        });
    });

    it('should return the correct status and text if there is no error for capabilities-selector ', () => {
      capabilitiesContext.getCapabilitiesContext = jest.fn()
        .mockImplementation(() => Promise.resolve(mockCapabilitiesContext));

      return request(setUpFakeApp())
        .get('/solutions/capabilities-selector')
        .expect(200)
        .then((res) => {
          expect(res.text.includes('data-test-id="capabilities-selector"')).toEqual(true);
          expect(res.text.includes('data-test-id="error-title"')).toEqual(false);
        });
    });

    it('should return the correct status and text if there is no error for capabilities-selector with capabilities and capabilities are selected', () => {
      solutionListPageContext.getSolutionsForSelectedCapabilities = jest.fn()
        .mockImplementation(() => Promise.resolve(mockFoundationSolutionsContext));

      return request(setUpFakeApp())
        .get('/solutions/capabilities-selector.C1')
        .expect(200)
        .then((res) => {
          expect(res.text.includes('data-test-id="solutions-list-body"')).toEqual(true);
          expect(res.text.includes('data-test-id="error-title"')).toEqual(false);
        });
    });
  });

  describe('GET /solutions/:filterType.:capabilities?/:solutionId', () => {
    afterEach(() => {
      viewSolutionController.getPublicSolutionById.mockReset();
    });

    it('should return the correct status and text if there is no error', () => {
      viewSolutionController.getPublicSolutionById = jest.fn()
        .mockImplementation(() => Promise.resolve(mockGetPublicSolutionById));

      return request(setUpFakeApp())
        .get('/solutions/foundation/1')
        .expect(200)
        .then((res) => {
          expect(res.text.includes(`<h1 data-test-id="view-solution-page-solution-name" class="nhsuk-u-margin-bottom-2">${mockGetPublicSolutionById.name}</h1>`)).toEqual(true);
          expect(res.text.includes('data-test-id="error-title"')).toEqual(false);
        });
    });

    it('should return the correct status and text if there is no error with capabilities', () => {
      viewSolutionController.getPublicSolutionById = jest.fn()
        .mockImplementation(() => Promise.resolve(mockGetPublicSolutionById));

      return request(setUpFakeApp())
        .get('/solutions/capabilities-selector.C1/1')
        .expect(200)
        .then((res) => {
          expect(res.text.includes(`<h1 data-test-id="view-solution-page-solution-name" class="nhsuk-u-margin-bottom-2">${mockGetPublicSolutionById.name}</h1>`)).toEqual(true);
          expect(res.text.includes('data-test-id="error-title"')).toEqual(false);
        });
    });
  });

  describe('POST /solutions/capabilities-selector', () => {
    it('should return 403 forbidden if no csrf token is available', () => (
      request(setUpFakeApp())
        .post('/solutions/capabilities-selector')
        .type('form')
        .send({
          capabilities: 'C1',
        })
        .expect(403)));

    it('should return the correct status and text if there is no error and one capability selected', async () => {
      capabilitiesContext.getCapabilitiesContext = jest.fn()
        .mockImplementation(() => Promise.resolve(mockCapabilitiesContext));

      solutionListPageContext.getSolutionsForSelectedCapabilities = jest.fn()
        .mockImplementation(() => Promise.resolve(mockFilteredSolutions));

      const { cookies, csrfToken, app } = await getCsrfTokenFromGet(setUpFakeApp(), '/solutions/capabilities-selector');

      return request(app)
        .post('/solutions/capabilities-selector')
        .type('form')
        .set('Cookie', cookies)
        .send({
          capabilities: 'C1',
          _csrf: csrfToken,
        })
        .expect(302)
        .then((res) => {
          expect(res.redirect).toEqual(true);
          expect(res.headers.location).toEqual('/solutions/capabilities-selector.C1');
        });
    });

    it('should return the correct status and text if there is no error and many capabilities selected', async () => {
      capabilitiesContext.getCapabilitiesContext = jest.fn()
        .mockImplementation(() => Promise.resolve(mockCapabilitiesContext));

      solutionListPageContext.getSolutionsForSelectedCapabilities = jest.fn()
        .mockImplementation(() => Promise.resolve(mockFilteredSolutions));

      const { cookies, csrfToken } = await getCsrfTokenFromGet(setUpFakeApp(), '/solutions/capabilities-selector');

      return request(setUpFakeApp())
        .post('/solutions/capabilities-selector')
        .type('form')
        .set('Cookie', cookies)
        .send({
          capabilities: ['C1', 'C2', 'C3'],
          _csrf: csrfToken,
        })
        .expect(302)
        .then((res) => {
          expect(res.redirect).toEqual(true);
          expect(res.headers.location).toEqual('/solutions/capabilities-selector.C1+C2+C3');
        });
    });

    it('should return the correct status and text if there is no error and capabilities not selected', async () => {
      capabilitiesContext.getCapabilitiesContext = jest.fn()
        .mockImplementation(() => Promise.resolve(mockCapabilitiesContext));

      solutionListPageContext.getSolutionsForSelectedCapabilities = jest.fn()
        .mockImplementation(() => Promise.resolve(mockFilteredSolutions));

      const { cookies, csrfToken } = await getCsrfTokenFromGet(setUpFakeApp(), '/solutions/capabilities-selector');

      return request(setUpFakeApp())
        .post('/solutions/capabilities-selector')
        .type('form')
        .set('Cookie', cookies)
        .send({
          capabilities: 'all',
          _csrf: csrfToken,
        })
        .expect(302)
        .then((res) => {
          expect(res.redirect).toEqual(true);
          expect(decodeURI(res.headers.location)).toEqual('/solutions/capabilities-selector.all');
        });
    });
  });

  describe('GET /solutions/:filterType.:capabilities?/:solutionId/document/:documentName', () => {
    it('should return the correct status and text if there is no error', () => {
      getDocument
        .mockResolvedValueOnce({ data: createReadStream(path.resolve(__dirname, 'data.pdf')) });
      request(setUpFakeApp())
        .get('/solutions/foundation/1/document/somedoc')
        .expect(200)
        .then((res) => {
          expect(res.text).toEqual(readFileSync(path.resolve(__dirname, 'data.pdf'), 'utf8'));
          expect(res.text.includes('data-test-id="error-title"')).toEqual(false);
          getDocument.mockRestore();
        });
    });
  });

  describe('Error handler', () => {
    it('should return error page if there is an error from /solutions/:filterType.:capabilities? route', () => {
      solutionListPageContext.getSolutionListPageContext = jest.fn()
        .mockImplementation(() => Promise.reject());

      return request(setUpFakeApp())
        .get('/solutions/foundation')
        .expect(200)
        .then((res) => {
          expect(res.text.includes('data-test-id="solutions-list-body"')).toEqual(false);
          expect(res.text.includes('data-test-id="error-title"')).toEqual(true);
          solutionListPageContext.getSolutionListPageContext.mockReset();
        });
    });

    it('should return error page if there is an error from /solutions/:filterType.:capabilities? route with capabilities', () => {
      solutionListPageContext.getSolutionsForSelectedCapabilities = jest.fn()
        .mockImplementation(() => Promise.reject());

      return request(setUpFakeApp())
        .get('/solutions/capabilities-selector.C1')
        .expect(200)
        .then((res) => {
          expect(res.text.includes('data-test-id="solutions-list-body"')).toEqual(false);
          expect(res.text.includes('data-test-id="error-title"')).toEqual(true);
          solutionListPageContext.getSolutionsForSelectedCapabilities.mockReset();
        });
    });

    it('should return error page if there is an error from the /solutions/:filterType.:capabilities?/:solutionId route', () => {
      viewSolutionController.getPublicSolutionById = jest.fn()
        .mockImplementation(() => Promise.reject());

      return request(setUpFakeApp())
        .get('/solutions/foundation/1')
        .expect(200)
        .then((res) => {
          expect(res.text.includes('data-test-id="dashboard"')).toEqual(false);
          expect(res.text.includes('data-test-id="error-title"')).toEqual(true);
          viewSolutionController.getPublicSolutionById.mockReset();
        });
    });
  });

  describe('GET *', () => {
    it('should return error page if url cannot be matched', () => (
      request(setUpFakeApp())
        .get('/aaaa')
        .expect(200)
        .then((res) => {
          expect(res.text.includes('<h1 class="nhsuk-heading-l nhsuk-u-margin-top-5" data-test-id="error-title">Incorrect url /aaaa</h1>')).toEqual(true);
          expect(res.text.includes('<p data-test-id="error-description">Please check it is valid and try again</p>')).toEqual(true);
        })));
  });

  // TODO: USE_CAPABILITIES_SELECTOR Remove test below when capabilities selector is on by default
  describe('when capabilities selector is off by default', () => {
    beforeEach(() => {
      config.useCapabilitiesSelector = 'false';
    });
    it('should return the correct status and redirect to capabilities-selector.all if there is no errors', () => {
      capabilitiesContext.getCapabilitiesContext = jest.fn()
        .mockImplementation(() => Promise.resolve(mockCapabilitiesContext));

      return request(setUpFakeApp())
        .get('/solutions/capabilities-selector')
        .expect(302)
        .then((res) => {
          expect(res.redirect).toEqual(true);
          expect(res.headers.location).toEqual('/solutions/capabilities-selector.all');
        });
    });
  });
});
