import express from 'express';
import {
  getSolutionFoundationListPageContext,
  getSolutionListPageContext,
} from './controller';

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('home-page', {});
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
