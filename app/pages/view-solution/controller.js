import { ErrorContext, getData } from 'buying-catalogue-library';
import { createViewSolutionPageContext } from './solutionPageContext';
import { logger } from '../../logger';
import { getEndpoint } from '../../endpoints';

export const getPublicSolutionById = async ({ solutionId }) => {
  const endpoint = getEndpoint({ endpointLocator: 'getPublicSolutionById', options: { solutionId } });
  const solutionData = await getData({ endpoint, logger });

  if (solutionData) {
    logger.info(`Solution ${solutionId}: ${solutionData.name} returned`);
    return createViewSolutionPageContext({ solutionData });
  }
  throw new ErrorContext({
    status: 404,
    description: 'No data returned',
  });
};
