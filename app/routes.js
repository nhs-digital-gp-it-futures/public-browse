import express from 'express';
import {
  getPublicSolutionById,
  getSolutionListPageContext,
} from './controller';

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('homepage/template.njk', {});
});

router.get('/solutions', async (req, res) => {
  res.render('browse-solutions-page', {});
});

router.get('/solutions/:filterType', async (req, res) => {
  const { filterType } = req.params;
  const context = await getSolutionListPageContext(filterType);
  res.render('solutions-list-page', context);
});

router.get('/solutions/:filterType/:solutionId', async (req, res) => {
  const { solutionId } = req.params;
  const context = await getPublicSolutionById(solutionId);
  res.render('view-solution-page', context);
});

module.exports = router;
