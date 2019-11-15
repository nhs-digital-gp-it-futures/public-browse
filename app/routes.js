import express from 'express';
import {
  getShowCardsPageContext,
  getSolutionPageContext,
  postCapabilityFilters,
  getFoundationCapabilitySolutions,
  getPublicSolutionById,
} from './controller';

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('home-page', {});
});

router.get('/view-solution/:solutionId', async (req, res) => {
  const { solutionId } = req.params;
  const context = await getPublicSolutionById(solutionId);
  res.render('view-solution-page', context);
});

router.get('/browse-solutions', async (req, res) => {
  res.render('browse-solutions-page', {});
});

// router.get('/', async (req, res) => {
//   const context = await getShowCardsPageContext();

//   res.render('index', context);
// });

// router.get('/foundation', async (req, res) => {
//   const context = await getFoundationCapabilitySolutions();

//   res.render('index', context);
// });

// router.get('/view/:solutionId', async (req, res) => {
//   const { solutionId } = req.params;

//   const context = await getSolutionPageContext(solutionId);

//   res.render('solution-page', context);
// });

// router.post('/', async (req, res) => {
//   const selectedCapabilities = req.body;

//   const context = await postCapabilityFilters(selectedCapabilities);

//   res.render('index', context);
// });

module.exports = router;
