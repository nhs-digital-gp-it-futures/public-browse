import { ErrorContext } from 'buying-catalogue-library';
import { getData } from '../../apiProvider';
import { createViewSolutionPageContext } from './solutionPageContext';
import { logger } from '../../logger';

export const getPublicSolutionById = async ({ solutionId }) => {
  const solutionData = await getData({ endpointLocator: 'getPublicSolutionById', options: { solutionId } });

  if (solutionData) {
    logger.info(`Solution ${solutionId}: ${solutionData.name} returned`);
    return createViewSolutionPageContext({ solutionData });
  }
  throw new ErrorContext({
    status: 404,
    description: 'No data returned',
  });
};
