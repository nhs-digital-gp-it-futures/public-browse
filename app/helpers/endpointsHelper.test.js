import { getSolutionListDataEndpoint } from './endpointsHelper';
import { buyingCatalogueApiHost } from '../config';

describe('endpointsHelper', () => {
  describe('getSolutionListDataEndpoint', () => {
    it('returns correct endpoint for all', () => {
      expect(getSolutionListDataEndpoint(buyingCatalogueApiHost, 'all')).toEqual(`${buyingCatalogueApiHost}/api/v1/Solutions`);
    });

    it('returns correct endpoint for foundation', () => {
      expect(getSolutionListDataEndpoint(buyingCatalogueApiHost, 'foundation')).toEqual(`${buyingCatalogueApiHost}/api/v1/Solutions/Foundation`);
    });

    it('returns undefined when the filterType is not matched', () => {
      expect(getSolutionListDataEndpoint()).toEqual(undefined);
    });
  });
});
