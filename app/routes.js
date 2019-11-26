import express from 'express';
import { getPublicSolutionById } from './view-solution/controller';
import { getSolutionListPageContext } from './solutions-list/controller';
import { getBrowseSolutionsPageContext } from './browse-solutions/context';
import { getHomepageContext } from './homepage/context';

const router = express.Router();

router.get('/', (req, res) => {
  const context = getHomepageContext();
  res.render('homepage/template.njk', context);
});

router.get('/solutions', (req, res) => {
  const context = getBrowseSolutionsPageContext();
  res.render('browse-solutions/template.njk', context);
});

router.get('/solutions/:filterType', async (req, res) => {
  const { filterType } = req.params;
  const context = await getSolutionListPageContext(filterType);
  res.render('solutions-list/template.njk', context);
});

router.get('/solutions/:filterType/:solutionId', async (req, res) => {
  const { solutionId } = req.params;
  const context = await getPublicSolutionById(solutionId);
  res.render('view-solution/template.njk', context);
});

module.exports = router;
