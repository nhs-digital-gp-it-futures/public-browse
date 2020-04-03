import { status } from '../status';
import { getReadyStatus } from './getReadyStatus';
import * as apiProvider from '../../../apiProvider';

jest.mock('../../../apiProvider', () => ({
  getData: jest.fn(),
}));

describe('getReadyStatus', () => {
  afterEach(() => {
    apiProvider.getData.mockReset();
  });

  it('should call getData twice with the correct params', async () => {
    await getReadyStatus();
    expect(apiProvider.getData.mock.calls.length).toEqual(2);
    expect(apiProvider.getData).toHaveBeenNthCalledWith(1, { endpointLocator: 'getBuyingCatalogueApiHealth' });
    expect(apiProvider.getData).toHaveBeenNthCalledWith(2, { endpointLocator: 'getDocumentApiHealth' });
  });

  it('should return "Healthy" when BuyingCatalogueApi and DocumentApi are both "Healthy"', async () => {
    apiProvider.getData
      .mockReturnValueOnce(status.healthy.message)
      .mockReturnValueOnce(status.healthy.message);

    expect(await getReadyStatus()).toBe(status.healthy);
  });

  it('should return "Degraded" when BuyingCatalogueApi is "Healthy" and DocumentApi is "Degraded"', async () => {
    apiProvider.getData
      .mockReturnValueOnce(status.healthy.message)
      .mockReturnValueOnce(status.degraded.message);

    expect(await getReadyStatus()).toBe(status.degraded);
  });

  it('should return "Degraded" when BuyingCatalogueApi is "Healthy" and DocumentApi is "Unhealthy"', async () => {
    apiProvider.getData
      .mockReturnValueOnce(status.healthy.message)
      .mockReturnValueOnce(status.unhealthy.message);

    expect(await getReadyStatus()).toBe(status.degraded);
  });

  it('should return "Degraded" when BuyingCatalogueApi is "Degraded" and DocumentApi is "Healthy"', async () => {
    apiProvider.getData
      .mockReturnValueOnce(status.degraded.message)
      .mockReturnValueOnce(status.healthy.message);

    expect(await getReadyStatus()).toBe(status.degraded);
  });

  it('should return "Degraded" when BuyingCatalogueApi is "Degraded" and DocumentApi is "Degraded"', async () => {
    apiProvider.getData
      .mockReturnValueOnce(status.degraded.message)
      .mockReturnValueOnce(status.degraded.message);

    expect(await getReadyStatus()).toBe(status.degraded);
  });

  it('should return "Degraded" when BuyingCatalogueApi is "Degraded" and DocumentApi is "Unhealthy"', async () => {
    apiProvider.getData
      .mockReturnValueOnce(status.degraded.message)
      .mockReturnValueOnce(status.unhealthy.message);

    expect(await getReadyStatus()).toBe(status.degraded);
  });

  it('should return "Unhealthy" when BuyingCatalogueApi is "Unhealthy" and DocumentApi is "Healthy"', async () => {
    apiProvider.getData
      .mockReturnValueOnce(status.unhealthy.message)
      .mockReturnValueOnce(status.healthy.message);

    expect(await getReadyStatus()).toBe(status.unhealthy);
  });

  it('should return "Unhealthy" when BuyingCatalogueApi is "Unhealthy" and DocumentApi is "Degraded"', async () => {
    apiProvider.getData
      .mockReturnValueOnce(status.unhealthy.message)
      .mockReturnValueOnce(status.degraded.message);

    expect(await getReadyStatus()).toBe(status.unhealthy);
  });

  it('should return "Unhealthy" when BuyingCatalogueApi is "Unhealthy" and DocumentApi is "Unhealthy"', async () => {
    apiProvider.getData
      .mockReturnValueOnce(status.unhealthy.message)
      .mockReturnValueOnce(status.unhealthy.message);

    expect(await getReadyStatus()).toBe(status.unhealthy);
  });
});
