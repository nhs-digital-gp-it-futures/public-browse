import { getDocument, ErrorContext } from 'buying-catalogue-library';
import { logger } from './logger';
import { getEndpoint } from './endpoints';

export const getDocumentByFileName = async ({
  res, documentName, contentType, solutionId,
}) => {
  logger.info(`Downloading ${documentName}${solutionId ? ` for solution ${solutionId}` : ''}`);
  const endpoint = getEndpoint({
    endpointLocator: solutionId ? 'getSolutionDocument' : 'getDocument',
    options: { documentName, solutionId: solutionId || undefined },
  });
  try {
    const response = await getDocument({ endpoint, logger });
    res.setHeader('Content-type', contentType);
    response.data.pipe(res);
    return res;
  } catch (err) {
    if (err.response && err.response.status === 404) {
      throw new ErrorContext({
        status: 404,
        backLinkHref: '/',
        backLinkText: 'Back',
        description: 'Document not found',
      });
    }
    throw err;
  }
};
