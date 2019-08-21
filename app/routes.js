import express from 'express';
import { getShowCardsPageContext, getSolutionPageContext, postCapabilityFilters } from './controller';

const router = express.Router();

router.get('/', async (req, res) => {
  const context = await getShowCardsPageContext();

  res.render('index', context);
});

router.get('/:solutionId', async (req, res) => {
  const { solutionId } = req.params;

  const context = await getSolutionPageContext(solutionId);

  res.render('solution-page', context);
});

router.post('/', async (req, res) => {
  const selectedCapabilities = req.body;

  const context = await postCapabilityFilters(selectedCapabilities);

  res.render('index', context);
});


module.exports = router;
