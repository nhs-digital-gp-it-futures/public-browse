import express from 'express';
import { logger } from '../../logger';
import { getReadyStatus } from './ready/getReadyStatus';
import { status } from './status';
import { loginEnabled } from '../../config';

const router = express.Router();

router.get('/live', (req, res) => {
  logger.info('navigating to health/live page');
  const liveStatus = status.healthy;
  res.status(liveStatus.code).send(liveStatus.message);
});

router.get('/ready', async (req, res) => {
  logger.info('navigating to health/ready page');
  const readyStatus = await getReadyStatus(loginEnabled);
  res.status(readyStatus.code).send(readyStatus.message);
});

module.exports = router;
