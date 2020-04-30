import { getData } from 'buying-catalogue-library';
import { status } from '../status';
import { logger } from '../../../logger';
import { getEndpoint } from '../../../endpoints';

export const getReadyStatus = async (loginEnabled) => {
  let buyingCatalogueApi;
  let documentApi;
  let identityApi = status.healthy.message;

  try {
    const endpoint = getEndpoint({ endpointLocator: 'getBuyingCatalogueApiHealth' });
    buyingCatalogueApi = await getData({ endpoint, logger });
  } catch (e) {
    logger.error('Buying Catalogue Api is not healthy');
    buyingCatalogueApi = status.unhealthy.message;
  }

  try {
    const endpoint = getEndpoint({ endpointLocator: 'getDocumentApiHealth' });
    documentApi = await getData({ endpoint, logger });
  } catch (e) {
    logger.error('Document Api is not healthy');
    documentApi = status.unhealthy.message;
  }

  if (loginEnabled === 'true') {
    try {
      const endpoint = getEndpoint({ endpointLocator: 'getIdentityApiHealth' });
      identityApi = await getData({ endpoint, logger });
    } catch (e) {
      logger.error('Identity Api is not healthy');
      identityApi = status.unhealthy.message;
    }
  }

  const isHealthy = healthcheckResponse => healthcheckResponse === status.healthy.message;
  const isUnhealthy = healthcheckResponse => healthcheckResponse === status.unhealthy.message;

  if (isHealthy(buyingCatalogueApi) && isHealthy(documentApi) && isHealthy(identityApi)) {
    return status.healthy;
  }

  if (isUnhealthy(buyingCatalogueApi)) {
    return status.unhealthy;
  }

  return status.degraded;
};
