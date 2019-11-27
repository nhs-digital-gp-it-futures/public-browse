import express from 'express';
import { getPublicSolutionById } from './view-solution/controller';
import { getSolutionListPageContext } from './solutions-list/controller';
import { getBrowseSolutionsPageContext } from './browse-solutions/context';
import { getHomepageContext } from './homepage/context';
import { errorHandler } from './error/errorHandler';
import logger from './logger';

const router = express.Router();

router.get('/', (req, res) => {
  const context = getHomepageContext();
  logger.info('navigating to home page');
  res.render('homepage/template.njk', context);
});

router.get('/solutions', (req, res) => {
  const context = getBrowseSolutionsPageContext();
  logger.info('navigating to browse solutions');
  res.render('browse-solutions/template.njk', context);
});

router.get('/solutions/:filterType', async (req, res, next) => {
  const { filterType } = req.params;
  logger.info(`filter type '${filterType}' applied`);
  try {
    const context = await getSolutionListPageContext(filterType);
    res.render('solutions-list/template.njk', context);
  } catch (err) {
    next(err);
  }
});

router.get('/solutions/:filterType/:solutionId', async (req, res, next) => {
  const { solutionId } = req.params;
  logger.info(`navigating to Solution ${solutionId} page`);
  try {
    const context = await getPublicSolutionById(solutionId);
    res.render('view-solution/template.njk', context);
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
    res.render('error/template.njk', context);
  }
});

module.exports = router;
