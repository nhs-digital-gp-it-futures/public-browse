import express from 'express';
import { ErrorContext, errorHandler, health } from 'buying-catalogue-library';
import { getPublicSolutionById } from './pages/view-solution/controller';
import { getSolutionListPageContext, getSolutionsForSelectedCapabilities } from './pages/solutions-list/controller';
import { getBrowseSolutionsPageContext } from './pages/browse-solutions/context';
import { getHomepageContext } from './pages/homepage/context';
import { getGuidePageContext } from './pages/guide/context';
import { getComparePageContext } from './pages/compare/controller';
import { getCapabilitiesContext } from './pages/capabilities-selector/controller';
import { logger } from './logger';
import config from './config';
import { includesContext } from './includes/contextCreator';
import { withCatch, getCapabilitiesParam, determineContentType } from './helpers/routerHelper';
import { getDocument } from './apiProvider';
import { getCovid19SolutionListPageContext } from './pages/covid19/controller';

const addContext = ({ context, user, csrfToken }) => ({
  ...context,
  ...includesContext,
  username: user && user.name,
  csrfToken,
  config,
});

export const routes = (authProvider) => {
  const router = express.Router();

  const dependencies = [
    {
      name: 'Buying Catalogue API',
      endpoint: `${config.buyingCatalogueApiHost}/health/ready`,
      critical: true,
    },
    {
      name: 'Document API',
      endpoint: `${config.documentApiHost}/health/ready`,
    },
  ];

  if (config.loginEnabled === 'true') {
    const isapiDependency = {
      name: 'Identity Server',
      endpoint: `${config.oidcBaseUri}/health/ready`,
      critical: true,
    };

    dependencies.push(isapiDependency);
  }

  console.log('depende', dependencies);

  health({ router, dependencies, logger });

  if (authProvider) {
    router.get('/login', authProvider.login());

    router.get('/oauth/callback', authProvider.loginCallback());

    router.get('/logout', async (req, res) => {
      const idToken = req.session && req.session.accessToken && req.session.accessToken.id_token;
      const url = await authProvider.logout({ req, idToken });
      res.redirect(url);
    });

    router.get('/signout-callback-oidc', async (req, res) => {
      if (req.logout) req.logout();
      req.session = null;

      if (req.headers.cookie) {
        req.headers.cookie.split(';')
          .map(cookie => cookie.split('=')[0])
          .forEach(cookieKey => res.clearCookie(cookieKey));
      }

      res.redirect(config.logoutRedirectPath);
    });

    router.get('/back-from-admin', (req, res, next) => {
      req.headers.referer = `${config.appBaseUri}${config.baseUrl}/`;
      authProvider.login()(req, res, next);
    });
  }

  router.get('/', (req, res) => {
    const context = getHomepageContext({ user: req.user });
    logger.info('navigating to home page');
    res.render('pages/homepage/template.njk', addContext({ context, user: req.user }));
  });

  router.get('/guide', (req, res) => {
    const context = getGuidePageContext();
    logger.info('navigating to guide');
    res.render('pages/guide/template.njk', addContext({ context, user: req.user }));
  });

  router.get('/solutions', (req, res) => {
    const context = getBrowseSolutionsPageContext();
    logger.info('navigating to browse solutions');
    res.render('pages/browse-solutions/template.njk', addContext({ context, user: req.user }));
  });

  router.get('/solutions/compare', (req, res) => {
    const context = getComparePageContext();
    logger.info('navigating to compare');
    res.render('pages/compare/template.njk', addContext({ context, user: req.user }));
  });

  router.get('/solutions/compare/document', async (req, res) => {
    logger.info('downloading solution comparison document');
    const response = await getDocument({
      endpointLocator: 'getDocument',
      options: { documentName: 'compare-solutions.xlsx' },
    });
    res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    response.data.pipe(res);
  });

  router.post('/solutions/capabilities-selector', withCatch(async (req, res) => {
    const capabilitiesParam = getCapabilitiesParam(req.body.capabilities);
    logger.info(`capabilities submitted - ${capabilitiesParam}`);
    res.redirect(`/solutions/capabilities-selector${capabilitiesParam}`);
  }));

  // TODO: SHOW_COVID19 Remove when covid19 is no longer needed.
  router.get('/solutions/covid19', withCatch(async (req, res) => {
    const context = await getCovid19SolutionListPageContext();
    logger.info('navigating to covid19 page');
    return res.render('pages/covid19/template.njk', addContext({ context, user: req.user }));
  }));

  router.get('/solutions/:filterType.:capabilities?', withCatch(async (req, res) => {
    const { filterType, capabilities } = req.params;
    if (filterType === 'capabilities-selector') {
      if (!capabilities) {
        // TODO: USE_CAPABILITIES_SELECTOR Remove line below when
        // capabilities-selector is on by default
        if (config.useCapabilitiesSelector === 'false') return res.redirect('/solutions/capabilities-selector.all');
        const context = await getCapabilitiesContext();
        logger.info('navigating to capabilities-selector page');
        return res.render('pages/capabilities-selector/template.njk', addContext({ context, user: req.user, csrfToken: req.csrfToken() }));
      }
      const context = await getSolutionsForSelectedCapabilities({
        capabilitiesSelected: capabilities,
      });
      logger.info(`navigating to solution-list (with ${capabilities} selected) page`);
      return res.render('pages/solutions-list/template.njk', addContext({ context, user: req.user }));
    }
    const context = await getSolutionListPageContext({ filterType });
    logger.info(`navigating to ${filterType} solution-list page`);
    return res.render('pages/solutions-list/template.njk', addContext({ context, user: req.user }));
  }));

  router.get('/solutions/:filterType.:capabilities?/:solutionId', withCatch(async (req, res) => {
    const { solutionId } = req.params;
    logger.info(`navigating to Solution ${solutionId} page`);
    const context = await getPublicSolutionById({ solutionId });
    res.render('pages/view-solution/template.njk', addContext({ context, user: req.user }));
  }));

  router.get('/solutions/:filterType.:capabilities?/:solutionId/document/:documentName', async (req, res) => {
    const { solutionId, documentName } = req.params;
    logger.info(`downloading Solution ${solutionId} document ${documentName}`);
    const response = await getDocument({
      endpointLocator: 'getSolutionDocument',
      options: { solutionId, documentName },
    });
    res.setHeader('Content-type', determineContentType(documentName));
    response.data.pipe(res);
  });
  router.get('*', (req) => {
    throw new ErrorContext({
      status: 404,
      title: `Incorrect url ${req.originalUrl}`,
      description: 'Please check it is valid and try again',
    });
  });

  errorHandler(router, (error, req, res) => {
    logger.error(`${error.title} - ${error.description} - ${JSON.stringify(error)}`);
    return res.render('pages/error/template.njk', addContext({ context: error, user: req.user }));
  });

  return router;
};
