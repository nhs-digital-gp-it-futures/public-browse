import { getData } from '../../apiProvider';
import { createViewSolutionPageContext } from './solutionPageContext';
import { logger } from '../../logger';

export const getPublicSolutionById = async ({ solutionId }) => {
  const solutionData = await getData({ endpointLocator: 'getPublicSolutionById', options: { solutionId } });

  if (solutionData) {
    logger.info(`Solution ${solutionId}: ${solutionData.name} returned`);
    return createViewSolutionPageContext({ solutionData });
  }
  throw new Error('No data returned');
};

