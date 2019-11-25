import express from 'express';
import { getPublicSolutionById } from './view-solution/controller';
import { getSolutionListPageContext } from './solutions-list/controller';
import { errorHandler } from './error/errorHandler';
import logger from './error/logger';

const router = express.Router();

router.get('/', async (req, res) => {
  logger.info('navigating to home page');
  res.render('homepage/template.njk', {});
});

router.get('/solutions', async (req, res) => {
  logger.info('navigating to browse solutions');
  res.render('browse-solutions/template.njk', {});
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
    logger.error(context.message)
    res.render('error/template.njk', context);
  }
});

module.exports = router;
