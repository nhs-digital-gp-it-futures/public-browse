import { createViewSolutionPageContext } from './solutionPageContext';
import { ApiProvider } from '../../apiProvider';
import logger from '../../logger';

export const getPublicSolutionById = async ({ solutionId }) => {
  const response = await new ApiProvider().getPublicSolutionById({ solutionId });

  if (response.data) {
    logger.info(`Solution ${solutionId}: ${response.data.name} returned`);
    return createViewSolutionPageContext({ previewData: response.data });
  }
  throw new Error('No data returned');
};
