import { getData } from '../../apiProvider2';
import { createViewSolutionPageContext } from './solutionPageContext';
import { ApiProvider } from '../../apiProvider';
import { logger } from '../../logger';

export const getPublicSolutionById = async ({ solutionId }) => {
  const { data: solutionData } = await getData({ endpointLocator: 'getPublicSolutionById', options: { solutionId } });

  if (solutionData) {
    logger.info(`Solution ${solutionId}: ${solutionData.name} returned`);
    return createViewSolutionPageContext({ solutionData });
  }
  throw new Error('No data returned');
};

export const getDocument = async ({ solutionId, documentName }) => (
  new ApiProvider().getDocument({ solutionId, documentName })
);
