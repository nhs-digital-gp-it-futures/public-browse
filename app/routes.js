import express from 'express';
import {
  errorHandler, healthRoutes, authenticationRoutes, ErrorContext,
  cookiePolicyAgreed, cookiePolicyExists,
} from 'buying-catalogue-library';
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
import { getVaccinationsSolutionListPageContext } from './pages/vaccinations/controller';
import {
  withCatch, getCapabilitiesParam, determineContentType, getHealthCheckDependencies,
} from './helpers/routerHelper';
import { getDocumentByFileName } from './documentController';

const addContext = ({ context, req, csrfToken }) => ({
  ...context,
  ...includesContext,
  username: req && req.user && req.user.name,
  csrfToken,
  config,
  showCookieBanner: !cookiePolicyExists({ req, logger }),
});

export const routes = (authProvider) => {
  const router = express.Router();

  healthRoutes({ router, dependencies: getHealthCheckDependencies(config), logger });

  if (authProvider) {
    authenticationRoutes({
      router, authProvider, tokenType: 'id', logoutRedirectPath: config.logoutRedirectPath, logger,
    });

    router.get('/re-login', (req, res, next) => {
      req.headers.referer = `${config.appBaseUri}${config.baseUrl}/`;
      authProvider.login()(req, res, next);
    });
  }

  router.get('/dismiss-cookie-banner', (req, res) => {
    cookiePolicyAgreed({ res, logger });
    res.redirect(req.headers.referer);
  });

  router.get('/document/:documentName', withCatch(logger, async (req, res) => {
    const { documentName } = req.params;
    const contentType = 'application/pdf';
    const stream = await getDocumentByFileName({ res, documentName, contentType });
    stream.on('close', () => res.end());
  }));

  router.get('/', (req, res) => {
    const context = getHomepageContext({ user: req.user });
    logger.info('navigating to home page');
    res.render('pages/homepage/template.njk', addContext({ context, req }));
  });

  router.get('/guide', (req, res) => {
    const context = getGuidePageContext();
    logger.info('navigating to guide');
    res.render('pages/guide/template.njk', addContext({ context, req }));
  });

  router.get('/solutions', (req, res) => {
    const context = getBrowseSolutionsPageContext();
    logger.info('navigating to browse solutions');
    res.render('pages/browse-solutions/template.njk', addContext({ context, req }));
  });

  router.get('/solutions/covid19', () => {
    throw new ErrorContext({
      status: 410,
      title: 'Page no longer available',
      description: 'The page you are looking for is no longer available. Return to the <a href="/">Buying Catalogue homepage</a>.',
    });
  });

  router.get('/solutions/compare', (req, res) => {
    const context = getComparePageContext();
    logger.info('navigating to compare');
    res.render('pages/compare/template.njk', addContext({ context, req }));
  });

  router.get('/solutions/compare/document', withCatch(logger, async (req, res) => {
    const documentName = 'compare-solutions.xlsx';
    const contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const stream = await getDocumentByFileName({ res, documentName, contentType });
    stream.on('close', () => res.end());
  }));

  router.post('/solutions/capabilities-selector', withCatch(logger, async (req, res) => {
    const capabilitiesParam = getCapabilitiesParam(req.body.capabilities);
    logger.info(`capabilities submitted - ${capabilitiesParam}`);
    res.redirect(`/solutions/capabilities-selector${capabilitiesParam}`);
  }));

  // TODO: SHOW_VACCINATIONS Remove when vaccinations is no longer needed.
  router.get('/solutions/vaccinations', withCatch(logger, async (req, res) => {
    const context = await getVaccinationsSolutionListPageContext();
    logger.info('navigating to vaccinations page');
    return res.render('pages/vaccinations/template.njk', addContext({ context, req }));
  }));

  router.get('/nominate-organisation', withCatch(logger, async (req, res) => {
    logger.info('navigating to proxy buying page');
    return res.render('pages/proxy-buyer/template.njk', addContext({ req }));
  }));

  router.get('/solutions/:filterType.:capabilities?', withCatch(logger, async (req, res) => {
    const { filterType, capabilities } = req.params;
    if (filterType === 'capabilities-selector') {
      if (!capabilities) {
        // TODO: USE_CAPABILITIES_SELECTOR Remove line below when
        // capabilities-selector is on by default
        if (config.useCapabilitiesSelector === 'false') return res.redirect('/solutions/capabilities-selector.all');
        const context = await getCapabilitiesContext();
        logger.info('navigating to capabilities-selector page');
        return res.render('pages/capabilities-selector/template.njk', addContext({ context, req, csrfToken: req.csrfToken() }));
      }
      const context = await getSolutionsForSelectedCapabilities({
        capabilitiesSelected: capabilities,
      });
      logger.info(`navigating to solution-list (with ${capabilities} selected) page`);
      return res.render('pages/solutions-list/template.njk', addContext({ context, req }));
    }
    const context = await getSolutionListPageContext({ filterType });
    logger.info(`navigating to ${filterType} solution-list page`);
    return res.render('pages/solutions-list/template.njk', addContext({ context, req }));
  }));

  router.get('/solutions/:filterType.:capabilities?/:solutionId', withCatch(logger, async (req, res) => {
    const { solutionId } = req.params;
    logger.info(`navigating to Solution ${solutionId} page`);
    const context = await getPublicSolutionById({ solutionId });
    res.render('pages/view-solution/template.njk', addContext({ context, req }));
  }));

  router.get('/solutions/:filterType.:capabilities?/:solutionId/document/:documentName', withCatch(logger, async (req, res) => {
    const { solutionId, documentName } = req.params;
    const contentType = determineContentType(documentName);

    const stream = await getDocumentByFileName({
      res, documentName, contentType, solutionId,
    });
    stream.on('close', () => res.end());
  }));

  router.get('*', (req) => {
    throw new ErrorContext({
      status: 404,
      title: `Incorrect url ${req.originalUrl}`,
      description: 'Please check it is valid and try again',
    });
  });

  errorHandler(router, (error, req, res) => {
    logger.warn(`${error.title} - ${error.description} - ${JSON.stringify(error)}`);
    const context = {
      ...error,
      isDevelopment: config.isDevelopment(),
    };
    return res.render('pages/error/template.njk', addContext({ context, req }));
  });

  return router;
};
