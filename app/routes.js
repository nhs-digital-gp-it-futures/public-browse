import express from 'express';
import { getPublicSolutionById, getDocument } from './pages/view-solution/controller';
import { getSolutionListPageContext, getSolutionsForSelectedCapabilities } from './pages/solutions-list/controller';
import { getBrowseSolutionsPageContext } from './pages/browse-solutions/context';
import { getHomepageContext } from './pages/homepage/context';
import { getGuidePageContext } from './pages/guide/context';
import { getCapabilitiesContext } from './pages/capabilities-selector/controller';
import { errorHandler } from './pages/error/errorHandler';
import logger from './logger';
import config from './config';
import { withCatch } from './helpers/routerHelper';

const router = express.Router();

const addConfig = context => ({
  ...context,
  config,
});

router.get('/healthcheck', (req, res) => {
  logger.info('navigating to healthcheck page');
  res.send('Public browse is running!!!');
});

router.get('/', (req, res) => {
  const context = getHomepageContext();
  logger.info('navigating to home page');
  res.render('pages/homepage/template.njk', addConfig(context));
});

router.get('/guide', (req, res) => {
  const context = getGuidePageContext();
  logger.info('navigating to guide');
  res.render('pages/guide/template.njk', addConfig(context));
});

router.get('/solutions', (req, res) => {
  const context = getBrowseSolutionsPageContext();
  logger.info('navigating to browse solutions');
  res.render('pages/browse-solutions/template.njk', addConfig(context));
});

router.get('/solutions/capabilities-selector', withCatch(async (req, res) => {
  logger.info('navigating to capabilities-selector page');
  const context = await getCapabilitiesContext();
  res.render('pages/capabilities-selector/template.njk', addConfig(context));
}));

router.post('/solutions/capabilities-selector', withCatch(async (req, res) => {
  let capabilitiesSelected = req.body.capabilities;
  if (!Array.isArray(capabilitiesSelected)) capabilitiesSelected = [capabilitiesSelected];
  const queryParams = `?capabilities=${capabilitiesSelected.join('+')}`;
  res.redirect(`/solutions/capabilities-selector/selected${queryParams}`);
}));

router.get('/solutions/:filterType/selected', withCatch(async (req, res) => {
  const { filterType } = req.params;
  logger.info(`filter type '${filterType}' applied`);
  if (filterType === 'capabilities-selector') {
    if (req.query.capabilities) {
      const capabilities = req.query.capabilities.split(' ');
      const context = await getSolutionsForSelectedCapabilities({
        capabilitiesSelected: capabilities,
      });
      res.render('pages/solutions-list/template.njk', addConfig(context));
    } else throw new Error('No capabilities selected');
  } else {
    const context = await getSolutionListPageContext({ filterType });
    res.render('pages/solutions-list/template.njk', addConfig(context));
  }
}));

router.get('/solutions/:filterType/selected/:solutionId', withCatch(async (req, res) => {
  let query;
  if (req.query.capabilities) query = `capabilities=${req.query.capabilities.replace(' ', '+')}`;
  const { solutionId, filterType } = req.params;
  logger.info(`navigating to Solution ${solutionId} page`);
  const context = await getPublicSolutionById({ solutionId, filterType, query });
  res.render('pages/view-solution/template.njk', addConfig(context));
}));

router.get('/solutions/:filterType/selected/:solutionId/document/:documentName', async (req, res) => {
  const { solutionId, documentName } = req.params;
  logger.info(`downloading Solution ${solutionId} document ${documentName}`);
  const response = await getDocument({ solutionId, documentName });
  response.data.pipe(res);
});

router.get('*', (req, res, next) => {
  next({
    status: 404,
    message: 'Incorrect url - please check it is valid and try again',
  });
});

router.use((err, req, res, next) => {
  if (err) {
    const context = errorHandler(err);
    logger.error(context.message);
    res.render('pages/error/template.njk', addConfig(context));
  } else {
    next();
  }
});

module.exports = router;
