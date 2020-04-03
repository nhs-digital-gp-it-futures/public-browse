import { getData } from '../../../apiProvider';
import { status } from '../status';
import { logger } from '../../../logger';

export const getReadyStatus = async (loginEnabled) => {
  let buyingCatalogueApi;
  let documentApi;
  let identityApi = status.healthy.message;

  try {
    buyingCatalogueApi = await getData({ endpointLocator: 'getBuyingCatalogueApiHealth' });
  } catch (e) {
    logger.error('Buying Catalogue Api is not healthy');
    buyingCatalogueApi = status.unhealthy.message;
  }

  try {
    documentApi = await getData({ endpointLocator: 'getDocumentApiHealth' });
  } catch (e) {
    logger.error('Document Api is not healthy');
    documentApi = status.unhealthy.message;
  }

  if (loginEnabled === 'true') {
    try {
      identityApi = await getData({ endpointLocator: 'getIdentityApiHealth' });
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
