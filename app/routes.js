import express from 'express';
import passport from 'passport';
import { getPublicSolutionById, getDocument } from './pages/view-solution/controller';
import { getSolutionListPageContext, getSolutionsForSelectedCapabilities } from './pages/solutions-list/controller';
import { getBrowseSolutionsPageContext } from './pages/browse-solutions/context';
import { getHomepageContext } from './pages/homepage/context';
import { getGuidePageContext } from './pages/guide/context';
import { getCapabilitiesContext } from './pages/capabilities-selector/controller';
import { errorHandler } from './pages/error/errorHandler';
import logger from './logger';
import config from './config';
import { withCatch, getCapabilitiesParam } from './helpers/routerHelper';

const router = express.Router();

const addConfig = ({ context, user }) => ({
  ...context,
  username: user && user.id,
  config,
});

router.get('/login', passport.authenticate('openidconnect', {
  successReturnToOrRedirect: '/',
  scope: 'profile',
}));

router.get('/oauth/callback', passport.authenticate('openidconnect', {
  callback: true,
  successReturnToOrRedirect: '/',
  failureRedirect: '/',
}));

router.get('/healthcheck', (req, res) => {
  logger.info('navigating to healthcheck page');
  res.send('Public browse is running!!!');
});

router.get('/', (req, res) => {
  const context = getHomepageContext();
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
      const context = await getCapabilitiesContext();
      logger.info('navigating to capabilities-selector page');
      res.render('pages/capabilities-selector/template.njk', addConfig({ context, user: req.user }));
    } else {
      const context = await getSolutionsForSelectedCapabilities({
        capabilitiesSelected: capabilities,
      });
      logger.info(`navigating to solution-list (with ${capabilities} selected) page`);
      res.render('pages/solutions-list/template.njk', addConfig({ context, user: req.user }));
    }
  } else {
    const context = await getSolutionListPageContext({ filterType });
    logger.info(`navigating to ${filterType} solution-list page`);
    res.render('pages/solutions-list/template.njk', addConfig({ context, user: req.user }));
  }
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

module.exports = router;
