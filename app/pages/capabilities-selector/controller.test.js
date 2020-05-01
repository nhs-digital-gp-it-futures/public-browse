import { ErrorContext, getData } from 'buying-catalogue-library';
import { getCapabilitiesContext } from './controller';
import manifest from './manifest.json';
import { logger } from '../../logger';
import { buyingCatalogueApiHost } from '../../config';

jest.mock('buying-catalogue-library');

const mockedCapabilitiesData = {
  capabilities: [{
    reference: 'C5',
    version: '1.0.1',
    name: 'Appointments Management - GP',
    isFoundation: true,
  }, {
    reference: 'C13',
    version: '1.0.1',
    name: 'Patient Information Maintenance',
    isFoundation: true,
  }, {
    reference: 'C14',
    version: '1.0.1',
    name: 'Prescribing',
    isFoundation: true,
  }],
};

describe('capabilities-selector controller', () => {
  describe('getCapabilitiesContext', () => {
    afterEach(() => {
      getData.mockReset();
    });

    it('should call getData once with the correct params', async () => {
      getData
        .mockResolvedValueOnce(mockedCapabilitiesData);

      await getCapabilitiesContext();
      expect(getData.mock.calls.length).toEqual(1);
      expect(getData).toHaveBeenCalledWith({ endpoint: `${buyingCatalogueApiHost}/api/v1/Capabilities`, logger });
    });

    it('should return the context when capabilities data is returned by the ApiProvider', async () => {
      const expectedContext = {
        ...manifest,
        capabilities: {
          column1: [{
            text: 'Appointments Management - GP',
            value: 'C5',
          }, {
            text: 'Patient Information Maintenance',
            value: 'C13',
          }],
          column2: [{
            text: 'Prescribing',
            value: 'C14',
          }],
        },
      };

      getData
        .mockResolvedValueOnce(mockedCapabilitiesData);

      const context = await getCapabilitiesContext();

      expect(context).toEqual(expectedContext);
    });

    it('should throw an error when no data is returned from the ApiProvider', async () => {
      getData
        .mockResolvedValueOnce({});

      try {
        await getCapabilitiesContext();
      } catch (err) {
        expect(err).toEqual(new ErrorContext({
          status: 404,
          description: 'No data returned',
        }));
      }
    });
  });
});
