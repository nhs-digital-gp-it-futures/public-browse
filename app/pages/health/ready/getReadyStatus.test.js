import { getData } from 'buying-catalogue-library';
import { status } from '../status';
import { getReadyStatus } from './getReadyStatus';
import { logger } from '../../../logger';
import { buyingCatalogueApiHost, documentApiHost } from '../../../config';

jest.mock('buying-catalogue-library');

describe('getReadyStatus', () => {
  afterEach(() => {
    getData.mockReset();
  });

  it('should call getData twice with the correct params', async () => {
    await getReadyStatus();
    expect(getData.mock.calls.length).toEqual(2);
    expect(getData).toHaveBeenNthCalledWith(1, { endpoint: `${buyingCatalogueApiHost}/health/ready`, logger });
    expect(getData).toHaveBeenNthCalledWith(2, { endpoint: `${documentApiHost}/health/ready`, logger });
  });

  it('should return "Healthy" when BuyingCatalogueApi and DocumentApi are both "Healthy"', async () => {
    getData
      .mockReturnValueOnce(status.healthy.message)
      .mockReturnValueOnce(status.healthy.message);

    expect(await getReadyStatus()).toBe(status.healthy);
  });

  it('should return "Degraded" when BuyingCatalogueApi is "Healthy" and DocumentApi is "Degraded"', async () => {
    getData
      .mockReturnValueOnce(status.healthy.message)
      .mockReturnValueOnce(status.degraded.message);

    expect(await getReadyStatus()).toBe(status.degraded);
  });

  it('should return "Degraded" when BuyingCatalogueApi is "Healthy" and DocumentApi is "Unhealthy"', async () => {
    getData
      .mockReturnValueOnce(status.healthy.message)
      .mockReturnValueOnce(status.unhealthy.message);

    expect(await getReadyStatus()).toBe(status.degraded);
  });

  it('should return "Degraded" when BuyingCatalogueApi is "Degraded" and DocumentApi is "Healthy"', async () => {
    getData
      .mockReturnValueOnce(status.degraded.message)
      .mockReturnValueOnce(status.healthy.message);

    expect(await getReadyStatus()).toBe(status.degraded);
  });

  it('should return "Degraded" when BuyingCatalogueApi is "Degraded" and DocumentApi is "Degraded"', async () => {
    getData
      .mockReturnValueOnce(status.degraded.message)
      .mockReturnValueOnce(status.degraded.message);

    expect(await getReadyStatus()).toBe(status.degraded);
  });

  it('should return "Degraded" when BuyingCatalogueApi is "Degraded" and DocumentApi is "Unhealthy"', async () => {
    getData
      .mockReturnValueOnce(status.degraded.message)
      .mockReturnValueOnce(status.unhealthy.message);

    expect(await getReadyStatus()).toBe(status.degraded);
  });

  it('should return "Unhealthy" when BuyingCatalogueApi is "Unhealthy" and DocumentApi is "Healthy"', async () => {
    getData
      .mockReturnValueOnce(status.unhealthy.message)
      .mockReturnValueOnce(status.healthy.message);

    expect(await getReadyStatus()).toBe(status.unhealthy);
  });

  it('should return "Unhealthy" when BuyingCatalogueApi is "Unhealthy" and DocumentApi is "Degraded"', async () => {
    getData
      .mockReturnValueOnce(status.unhealthy.message)
      .mockReturnValueOnce(status.degraded.message);

    expect(await getReadyStatus()).toBe(status.unhealthy);
  });

  it('should return "Unhealthy" when BuyingCatalogueApi is "Unhealthy" and DocumentApi is "Unhealthy"', async () => {
    getData
      .mockReturnValueOnce(status.unhealthy.message)
      .mockReturnValueOnce(status.unhealthy.message);

    expect(await getReadyStatus()).toBe(status.unhealthy);
  });

  describe('when login is enabled', () => {
    it('should return "Healthy" when BuyingCatalogueApi, DocumentApi and IdentityApi is "Healthy"', async () => {
      getData
        .mockReturnValueOnce(status.healthy.message)
        .mockReturnValueOnce(status.healthy.message)
        .mockReturnValueOnce(status.healthy.message);

      expect(await getReadyStatus('true')).toBe(status.healthy);
    });

    it('should return "Degraded" when BuyingCatalogueApi, DocumentApi are "Healthy" and IdentityApi is not "Healthy"', async () => {
      getData
        .mockReturnValueOnce(status.healthy.message)
        .mockReturnValueOnce(status.healthy.message)
        .mockReturnValueOnce(status.unhealthy.message);

      expect(await getReadyStatus('true')).toBe(status.degraded);
    });
  });
});
