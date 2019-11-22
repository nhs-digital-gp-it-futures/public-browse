import express from 'express';
import { getPublicSolutionById } from './controller';
import { getSolutionListPageContext } from './solutions-list/controller';

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('home-page', {});
});

router.get('/solutions', async (req, res) => {
  res.render('browse-solutions-page', {});
});

router.get('/solutions/:filterType', async (req, res) => {
  const { filterType } = req.params;
  const context = await getSolutionListPageContext(filterType);
  res.render('solutions-list/template.njk', context);
});

router.get('/solutions/:filterType/:solutionId', async (req, res) => {
  const { solutionId } = req.params;
  const context = await getPublicSolutionById(solutionId);
  res.render('view-solution-page', context);
});

module.exports = router;
