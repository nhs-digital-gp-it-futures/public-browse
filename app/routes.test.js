import request from 'supertest';
import { App } from '../app';
import { Router } from './routes';
import { FakeAuthProvider } from './authProvider';
import * as homepageContext from './pages/homepage/context';
import * as viewSolutionController from './pages/view-solution/controller';
import * as solutionListPageContext from './pages/solutions-list/controller';
import * as capabilitiesContext from './pages/capabilities-selector/controller';
import * as browseSolutionsPageContext from './pages/browse-solutions/context';
import * as guidePageContext from './pages/guide/context';

jest.mock('./logger');

const mockFoundationSolutionsContext = {
  pageTitle: 'Foundation',
  pageDescription: 'These foundation solutions',
  solutions: [],
};

const mockFilteredSolutions = {
  pageTitle: 'Custom',
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

const setUpFakeApp = () => {
  const authProvider = new FakeAuthProvider();
  const app = new App(authProvider).createApp();
  app.use('/', new Router(authProvider).routes());
  return app;
};

describe('routes', () => {
  describe('GET /healthcheck', () => {
    it('should return the correct status and text', () => (
      request(setUpFakeApp())
        .get('/healthcheck')
        .expect(200)
        .then((res) => {
          expect(res.text).toBe('Public browse is running!!!');
        })));
  });

  describe('GET /login', () => {
    it('should return the correct status and redirect to the login page when not authenticated', () => (
      request(setUpFakeApp())
        .get('/login')
        .expect(302)
        .then((res) => {
          expect(res.redirect).toEqual(true);
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
          expect(res.text.includes('<div data-test-id="homepage-hero">')).toEqual(true);
          expect(res.text.includes('data-test-id="error-page-title"')).toEqual(false);
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
          expect(res.text.includes('data-test-id="error-page-title"')).toEqual(false);
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
          expect(res.text.includes('data-test-id="error-page-title"')).toEqual(false);
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
          expect(res.text.includes('data-test-id="error-page-title"')).toEqual(false);
        });
    });

    it('should return the correct status and text if there is no error for capabilities-selector and capabilities are selected', () => {
      capabilitiesContext.getCapabilitiesContext = jest.fn()
        .mockImplementation(() => Promise.resolve(mockCapabilitiesContext));

      return request(setUpFakeApp())
        .get('/solutions/capabilities-selector')
        .expect(200)
        .then((res) => {
          expect(res.text.includes('data-test-id="capabilities-selector"')).toEqual(true);
          expect(res.text.includes('data-test-id="error-page-title"')).toEqual(false);
        });
    });

    it('should return the correct status and text if there is no error for capabilities-selector with capabilities', () => {
      solutionListPageContext.getSolutionsForSelectedCapabilities = jest.fn()
        .mockImplementation(() => Promise.resolve(mockFoundationSolutionsContext));

      return request(setUpFakeApp())
        .get('/solutions/capabilities-selector.C1')
        .expect(200)
        .then((res) => {
          expect(res.text.includes('data-test-id="solutions-list-body"')).toEqual(true);
          expect(res.text.includes('data-test-id="error-page-title"')).toEqual(false);
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
          expect(res.text.includes('data-test-id="error-page-title"')).toEqual(false);
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
          expect(res.text.includes('data-test-id="error-page-title"')).toEqual(false);
        });
    });
  });

  describe('POST /solutions/capabilities-selector', () => {
    it('should return the correct status and text if there is no error and one capability selected', () => {
      solutionListPageContext.getSolutionsForSelectedCapabilities = jest.fn()
        .mockImplementation(() => Promise.resolve(mockFilteredSolutions));

      return request(setUpFakeApp())
        .post('/solutions/capabilities-selector')
        .send({ capabilities: 'C1' })
        .expect(302)
        .then((res) => {
          expect(res.redirect).toEqual(true);
          expect(res.headers.location).toEqual('/solutions/capabilities-selector.C1');
        });
    });

    it('should return the correct status and text if there is no error and many capabilities selected', () => {
      solutionListPageContext.getSolutionsForSelectedCapabilities = jest.fn()
        .mockImplementation(() => Promise.resolve(mockFilteredSolutions));

      return request(setUpFakeApp())
        .post('/solutions/capabilities-selector')
        .send({ capabilities: ['C1', 'C2', 'C3'] })
        .expect(302)
        .then((res) => {
          expect(res.redirect).toEqual(true);
          expect(res.headers.location).toEqual('/solutions/capabilities-selector.C1+C2+C3');
        });
    });

    it('should return the correct status and text if there is no error and capabilities not selected', () => {
      solutionListPageContext.getSolutionsForSelectedCapabilities = jest.fn()
        .mockImplementation(() => Promise.resolve(mockFilteredSolutions));

      return request(setUpFakeApp())
        .post('/solutions/capabilities-selector')
        .send('all')
        .expect(302)
        .then((res) => {
          expect(res.redirect).toEqual(true);
          expect(decodeURI(res.headers.location)).toEqual('/solutions/capabilities-selector.all');
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
          expect(res.text.includes('data-test-id="error-page-title"')).toEqual(true);
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
          expect(res.text.includes('data-test-id="error-page-title"')).toEqual(true);
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
          expect(res.text.includes('data-test-id="error-page-title"')).toEqual(true);
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
          expect(res.text.includes('<h1 class="nhsuk-heading-l nhsuk-u-padding-left-3" data-test-id="error-page-title">Error: Incorrect url /aaaa - please check it is valid and try again</h1>')).toEqual(true);
        })));
  });
});
