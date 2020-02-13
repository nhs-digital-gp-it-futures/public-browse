import express from 'express';
import { getPublicSolutionById } from './pages/view-solution/controller';
import { getSolutionListPageContext } from './pages/solutions-list/controller';
import { getBrowseSolutionsPageContext } from './pages/browse-solutions/context';
import { getHomepageContext } from './pages/homepage/context';
import { getGuidePageContext } from './pages/guide/context';
import { errorHandler } from './pages/error/errorHandler';
import logger from './logger';
import config from './config';

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

router.get('/solutions/:filterType', async (req, res, next) => {
  const { filterType } = req.params;
  logger.info(`filter type '${filterType}' applied`);
  try {
    const context = await getSolutionListPageContext({ filterType });
    res.render('pages/solutions-list/template.njk', addConfig(context));
  } catch (err) {
    next(err);
  }
});

router.get('/solutions/:filterType/:solutionId', async (req, res, next) => {
  const { solutionId } = req.params;
  logger.info(`navigating to Solution ${solutionId} page`);
  try {
    const context = await getPublicSolutionById({ solutionId });
    res.render('pages/view-solution/template.njk', addConfig(context));
  } catch (err) {
    next(err);
  }
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
