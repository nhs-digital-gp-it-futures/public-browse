import express from 'express';
import {
  getPublicSolutionById,
  getSolutionFoundationListPageContext,
  getSolutionListPageContext,
} from './controller';

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('homepage/template.njk', {});
});

router.get('/view-solution/:solutionId', async (req, res) => {
  const { solutionId } = req.params;
  const { filterType } = req.query;
  const context = await getPublicSolutionById(solutionId, filterType);
  res.render('view-solution-page', context);
});

router.get('/browse-solutions', async (req, res) => {
  res.render('browse-solutions-page', {});
});

router.get('/solutions/foundation', async (req, res) => {
  const context = await getSolutionFoundationListPageContext();
  res.render('solutions-list-page', context);
});

router.get('/solutions', async (req, res) => {
  const context = await getSolutionListPageContext();
  res.render('solutions-list-page', context);
});

module.exports = router;
