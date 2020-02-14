import { getCapabilitiesContext } from './controller';
import { ApiProvider } from '../../apiProvider';
import manifest from './manifest.json';

jest.mock('../../apiProvider');

describe('capability-selector controller', () => {
  describe('getCapabilitiesContext', () => {
    it('should return the context when preview data is returned by the ApiProvider', async () => {
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

      const mockedCapabilitiesData = {
        data: {
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
        },
      };

      ApiProvider.prototype.getCapabilities.mockResolvedValue(mockedCapabilitiesData);

      const context = await getCapabilitiesContext();

      expect(context).toEqual(expectedContext);
    });

    it('should throw an error when no data is returned from the ApiProvider', async () => {
      ApiProvider.prototype.getCapabilities.mockResolvedValue({});

      try {
        await getCapabilitiesContext();
      } catch (err) {
        expect(err).toEqual(new Error('No data returned'));
      }
    });
  });
});
