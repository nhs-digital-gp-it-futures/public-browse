import { ErrorContext } from 'buying-catalogue-library';
import { getData } from '../../apiProvider';
import { createCapabilitiesSelectorPageContext } from './capabilitiesSelectorPageContext';
import { logger } from '../../logger';

export const getCapabilitiesContext = async () => {
  const { capabilities } = await getData({ endpointLocator: 'getCapabilities' });
  if (capabilities) {
    logger.info('Solution capabilities returned');
    return createCapabilitiesSelectorPageContext({ capabilities });
  }
  throw new ErrorContext({
    status: 404,
    description: 'No data returned',
  });
};
