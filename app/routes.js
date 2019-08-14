import express from 'express';
import { getShowCardsPageContext, getSolutionPageContext } from './controller';

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


module.exports = router;
