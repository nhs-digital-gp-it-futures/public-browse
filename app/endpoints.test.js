import { getEndpoint } from './endpoints';

describe('Endpoints', () => {
  describe('getSolutionListDataEndpoint', () => {
    it('should return "/api/v1/Solutions/Foundation" when filterType is "all"', () => {
      const result = getEndpoint({
        endpointLocator: 'getSolutionListData',
        options: { filterType: 'all' },
      });

      expect(result).toBe('http://localhost:5100/api/v1/Solutions');
    });

    it('should return "/api/v1/Solutions/Foundation" when filterType is "foundation"', () => {
      const result = getEndpoint({
        endpointLocator: 'getSolutionListData',
        options: { filterType: 'foundation' },
      });

      expect(result).toBe('http://localhost:5100/api/v1/Solutions/Foundation');
    });

    it('should return undefined when filterType is not valid', () => {
      const result = getEndpoint({
        endpointLocator: 'getSolutionListData',
        options: { filterType: 'i do not exist' },
      });

      expect(result).toBe(undefined);
    });
  });
});
