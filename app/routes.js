import express from 'express';
import { getPublicSolutionById, getDocument } from './pages/view-solution/controller';
import { getSolutionListPageContext, getSolutionsForSelectedCapabilities } from './pages/solutions-list/controller';
import { getBrowseSolutionsPageContext } from './pages/browse-solutions/context';
import { getHomepageContext } from './pages/homepage/context';
import { getGuidePageContext } from './pages/guide/context';
import { getCapabilitiesContext } from './pages/capabilities-selector/controller';
import { errorHandler } from './pages/error/errorHandler';
import { logger } from './logger';
import config from './config';
import { includesContext } from './includes/contextCreator';
import healthRoutes from './pages/health/routes';
import { withCatch, getCapabilitiesParam } from './helpers/routerHelper';

const addConfig = ({ context, user, csrfToken }) => ({
  ...context,
  ...includesContext,
  username: user && user.name,
  csrfToken,
  config,
});

export const routes = (authProvider) => {
  const router = express.Router();

  router.use('/health', healthRoutes);

  router.get('/login', authProvider.login());

  router.get('/oauth/callback', authProvider.loginCallback());

  router.get('/logout', async (req, res) => {
    const url = await authProvider.logout();
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

  router.get('/', (req, res) => {
    const context = getHomepageContext({ user: req.user });
    logger.info('navigating to home page');
    res.render('pages/homepage/template.njk', addConfig({ context, user: req.user }));
  });

  router.get('/guide', (req, res) => {
    const context = getGuidePageContext();
    logger.info('navigating to guide');
    res.render('pages/guide/template.njk', addConfig({ context, user: req.user }));
  });

  router.get('/solutions', (req, res) => {
    const context = getBrowseSolutionsPageContext();
    logger.info('navigating to browse solutions');
    res.render('pages/browse-solutions/template.njk', addConfig({ context, user: req.user }));
  });

  router.post('/solutions/capabilities-selector', withCatch(async (req, res) => {
    const capabilitiesParam = getCapabilitiesParam(req.body.capabilities);
    logger.info(`capabilities submitted - ${capabilitiesParam}`);
    res.redirect(`/solutions/capabilities-selector${capabilitiesParam}`);
  }));

  router.get('/solutions/:filterType.:capabilities?', withCatch(async (req, res) => {
    const { filterType, capabilities } = req.params;
    if (filterType === 'capabilities-selector') {
      if (!capabilities) {
        // TODO: USE_CAPABILITIES_SELECTOR Remove line below when
        // capabilities-selector is on by default
        if (!config.useCapabilitiesSelector) return res.redirect('/solutions/capabilities-selector.all');
        const context = await getCapabilitiesContext();
        logger.info('navigating to capabilities-selector page');
        return res.render('pages/capabilities-selector/template.njk', addConfig({ context, user: req.user, csrfToken: req.csrfToken() }));
      }
      const context = await getSolutionsForSelectedCapabilities({
        capabilitiesSelected: capabilities,
      });
      logger.info(`navigating to solution-list (with ${capabilities} selected) page`);
      return res.render('pages/solutions-list/template.njk', addConfig({ context, user: req.user }));
    }
    const context = await getSolutionListPageContext({ filterType });
    logger.info(`navigating to ${filterType} solution-list page`);
    return res.render('pages/solutions-list/template.njk', addConfig({ context, user: req.user }));
  }));

  router.get('/solutions/:filterType.:capabilities?/:solutionId', withCatch(async (req, res) => {
    const { solutionId } = req.params;
    logger.info(`navigating to Solution ${solutionId} page`);
    const context = await getPublicSolutionById({ solutionId });
    res.render('pages/view-solution/template.njk', addConfig({ context, user: req.user }));
  }));

  router.get('/solutions/:filterType.:capabilities?/:solutionId/document/:documentName', async (req, res) => {
    const { solutionId, documentName } = req.params;
    logger.info(`downloading Solution ${solutionId} document ${documentName}`);
    const response = await getDocument({ solutionId, documentName });
    response.data.pipe(res);
  });

  router.get('*', (req, res, next) => {
    next({
      status: 404,
      message: `Incorrect url ${req.originalUrl} - please check it is valid and try again`,
    });
  });

  router.use((err, req, res, next) => {
    if (err) {
      const context = errorHandler(err);
      logger.error(context.message);
      res.render('pages/error/template.njk', addConfig({ context, user: req.user }));
    } else {
      next();
    }
  });

  return router;
};
