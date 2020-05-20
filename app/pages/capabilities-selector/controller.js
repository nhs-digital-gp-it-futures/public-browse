import { getData } from 'buying-catalogue-library';
import { createCapabilitiesSelectorPageContext } from './capabilitiesSelectorPageContext';
import { logger } from '../../logger';
import { getEndpoint } from '../../endpoints';

export const getCapabilitiesContext = async () => {
  const endpoint = getEndpoint({ endpointLocator: 'getCapabilities' });
  const { capabilities } = await getData({ endpoint, logger });

  if (capabilities) {
    logger.info('Solution capabilities returned');
    return createCapabilitiesSelectorPageContext({ capabilities });
  }
  logger.error('No data returned for capabilities');
  throw new Error();
};
