import { getData } from '../../apiProvider2';
import { createCapabilitiesSelectorPageContext } from './capabilitiesSelectorPageContext';
import { logger } from '../../logger';

export const getCapabilitiesContext = async () => {
  const { capabilities } = await getData({ endpointLocator: 'getCapabilities' })
  if (capabilities) {
    logger.info('Solution capabilities returned');
    return createCapabilitiesSelectorPageContext({ capabilities });
  }
  throw new Error('No data returned');
};
