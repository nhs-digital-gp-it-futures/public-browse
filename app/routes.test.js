import request from 'supertest';
import { App } from '../app';
import routes from './routes';
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

describe('routes', () => {
  describe('GET /healthcheck', () => {
    it('should return the correct status and text', () => {
      const app = new App().createApp();
      app.use('/', routes);

      return request(app)
        .get('/healthcheck')
        .expect(200)
        .then((res) => {
          expect(res.text).toBe('Public browse is running!!!');
        });
    });
  });

  describe('GET /', () => {
    afterEach(() => {
      homepageContext.getHomepageContext.mockReset();
    });

    it('should return the correct status and text if there is no error', () => {
      homepageContext.getHomepageContext = jest.fn()
        .mockImplementation(() => Promise.resolve({}));
      const app = new App().createApp();
      app.use('/', routes);

      return request(app)
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
      const app = new App().createApp();
      app.use('/', routes);

      return request(app)
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
      const app = new App().createApp();
      app.use('/', routes);

      return request(app)
        .get('/solutions')
        .expect(200)
        .then((res) => {
          expect(res.text.includes('data-test-id="browse-solutions"')).toEqual(true);
          expect(res.text.includes('data-test-id="error-page-title"')).toEqual(false);
        });
    });
  });

  describe('GET /solutions/:filterType', () => {
    afterEach(() => {
      solutionListPageContext.getSolutionListPageContext.mockReset();
    });

    it('should return the correct status and text if there is no error', () => {
      solutionListPageContext.getSolutionListPageContext = jest.fn()
        .mockImplementation(() => Promise.resolve(mockFoundationSolutionsContext));
      const app = new App().createApp();
      app.use('/', routes);

      return request(app)
        .get('/solutions/foundation')
        .expect(200)
        .then((res) => {
          expect(res.text.includes('data-test-id="solutions-list-body"')).toEqual(true);
          expect(res.text.includes('data-test-id="error-page-title"')).toEqual(false);
        });
    });
  });

  describe('GET /solutions/:filterType/:solutionId', () => {
    afterEach(() => {
      viewSolutionController.getPublicSolutionById.mockReset();
    });

    it('should return the correct status and text if there is no error', () => {
      viewSolutionController.getPublicSolutionById = jest.fn()
        .mockImplementation(() => Promise.resolve(mockGetPublicSolutionById));
      const app = new App().createApp();
      app.use('/', routes);

      return request(app)
        .get('/solutions/foundation/1')
        .expect(200)
        .then((res) => {
          expect(res.text.includes(`<h1 data-test-id="view-solution-page-solution-name" class="nhsuk-u-margin-bottom-2">${mockGetPublicSolutionById.name}</h1>`)).toEqual(true);
          expect(res.text.includes('data-test-id="error-page-title"')).toEqual(false);
        });
    });
  });

  describe('GET /solutions/capabilities-selector', () => {
    it('should return the correct status and text if there is no error', () => {
      capabilitiesContext.getCapabilitiesContext = jest.fn()
        .mockImplementation(() => Promise.resolve(mockCapabilitiesContext));
      const app = new App().createApp();
      app.use('/', routes);
      return request(app)
        .get('/solutions/capabilities-selector')
        .expect(200)
        .then((res) => {
          expect(res.text.includes('data-test-id="capabilities-selector"')).toEqual(true);
          expect(res.text.includes('data-test-id="error-page-title"')).toEqual(false);
        });
    });
  });

  describe('POST /solutions/custom', () => {
    it('should return the correct status and text if there is no error', () => {
      solutionListPageContext.getSolutionsForSelectedCapabilities = jest.fn()
        .mockImplementation(() => Promise.resolve(mockFilteredSolutions));
      const capabilities = ['C5', 'C21', 'C28'];
      const app = new App().createApp();
      app.use('/', routes);
      return request(app)
        .post('/solutions/custom')
        .send(capabilities)
        .expect(200)
        .then((res) => {
          expect(res.text.includes('data-test-id="general-page-title')).toEqual(true);
          expect(res.text.includes('data-test-id="error-page-title"')).toEqual(false);
        });
    });
  });

  describe('Error handler', () => {
    it('should return error page if there is an error from /solutions/:filterType route', () => {
      solutionListPageContext.getSolutionListPageContext = jest.fn()
        .mockImplementation(() => Promise.reject());
      const app = new App().createApp();
      app.use('/', routes);
      return request(app)
        .get('/solutions/foundation')
        .expect(200)
        .then((res) => {
          expect(res.text.includes('data-test-id="solutions-list-body"')).toEqual(false);
          expect(res.text.includes('data-test-id="error-page-title"')).toEqual(true);
          solutionListPageContext.getSolutionListPageContext.mockReset();
        });
    });

    it('should return error page if there is an error from the /solutions/:filterType/:solutionId route', () => {
      viewSolutionController.getPublicSolutionById = jest.fn()
        .mockImplementation(() => Promise.reject());
      const app = new App().createApp();
      app.use('/', routes);
      return request(app)
        .get('/solutions/foundation/1')
        .expect(200)
        .then((res) => {
          expect(res.text.includes('data-test-id="dashboard"')).toEqual(false);
          expect(res.text.includes('data-test-id="error-page-title"')).toEqual(true);
          viewSolutionController.getPublicSolutionById.mockReset();
        });
    });

    it('should return error page if there is an error from the post to /solutions/custom route', () => {
      solutionListPageContext.getSolutionsForSelectedCapabilities = jest.fn()
        .mockImplementation(() => Promise.reject(new Error('Error has occurred')));
      const capabilities = ['C5', 'C21', 'C28'];
      const app = new App().createApp();
      app.use('/', routes);
      return request(app)
        .post('/solutions/custom')
        .send({ capabilities })
        .expect(200)
        .then((res) => {
          expect(res.text.includes('data-test-id="general-page-title')).toEqual(false);
          expect(res.text.includes('data-test-id="error-page-title"')).toEqual(true);
          solutionListPageContext.getSolutionsForSelectedCapabilities.mockReset();
        });
    });
  });

  describe('GET *', () => {
    it('should return error page if url cannot be matched', () => {
      const app = new App().createApp();
      app.use('/', routes);
      return request(app)
        .get('/aaaa')
        .expect(200)
        .then((res) => {
          expect(res.text.includes('<h1 class="nhsuk-heading-l nhsuk-u-padding-left-3" data-test-id="error-page-title">Error: Incorrect url - please check it is valid and try again</h1>')).toEqual(true);
        });
    });
  });
});
