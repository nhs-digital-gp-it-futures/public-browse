import { createCapabilitySelectorPageContext } from './capabilitySelectorPageContext';
import { ApiProvider } from '../../apiProvider';
import logger from '../../logger';

export const getCapabilitiesContext = async () => {
  const response = await new ApiProvider().getCapabilities();

  if (response.data) {
    logger.info('Solution capabilities returned');
    return createCapabilitySelectorPageContext({ capabilities: response.data });
  }
  throw new Error('No data returned');
};
