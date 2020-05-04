import { getData, postData } from 'buying-catalogue-library';
import { getSolutionListPageContext, getSolutionsForSelectedCapabilities } from './controller';
import * as createContext from './context';
import foundationContent from './filterType/foundation/manifest.json';
import capabilitiesSelectorContent from './filterType/capabilities-selector/manifest.json';
import { logger } from '../../logger';
import { buyingCatalogueApiHost } from '../../config';

jest.mock('buying-catalogue-library');

jest.mock('./context', () => ({
  createSolutionListPageContext: jest.fn(),
}));

const mockedSolutionData = {
  solutions: [
    {
      id: '100001-001',
      name: 'Appointment Gateway',
      summary: 'Appointment Gateway is a complete appointment management suite that has been fully integrated with all major clinical systems throughout both the UK and Europe.',
      isFoundation: true,
      supplier: {
        id: '100001',
        name: 'Remedical Software',
      },
      capabilities: [
        {
          reference: 'C5',
          name: 'Appointments Management - GP',
        },
        {
          reference: 'C1',
          name: 'Appointments Management - Citizen',
        },
      ],
    },
  ],
};

describe('solutions-list controller', () => {
  describe('getSolutionListPageContext', () => {
    afterEach(() => {
      getData.mockReset();
      createContext.createSolutionListPageContext.mockReset();
    });

    it('should call getData once with the correct params', async () => {
      getData
        .mockResolvedValueOnce(mockedSolutionData);

      await getSolutionListPageContext({ filterType: 'foundation' });
      expect(getData).toHaveBeenCalledWith({
        endpoint: `${buyingCatalogueApiHost}/api/v1/Solutions/Foundation`,
        logger,
      });
    });

    it('should call createSolutionListPageContext once with the correct params', async () => {
      getData
        .mockResolvedValueOnce(mockedSolutionData);
      createContext.createSolutionListPageContext
        .mockResolvedValueOnce();

      await getSolutionListPageContext({ filterType: 'foundation' });

      expect(createContext.createSolutionListPageContext.mock.calls.length).toEqual(1);
      expect(createContext.createSolutionListPageContext).toHaveBeenCalledWith({
        filterType: 'foundation',
        solutionListManifest: foundationContent,
        solutionsData: mockedSolutionData.solutions,
      });
    });

    it('should throw an error when no data is returned from getData', async () => {
      getData
        .mockResolvedValueOnce();
      try {
        await getSolutionListPageContext({ filterType: 'foundation' });
      } catch (err) {
        expect(err).toEqual(new Error());
      }
    });

    it('should throw an error when no data is returned from getSolutionListManifest', async () => {
      getData
        .mockResolvedValueOnce();
      try {
        await getSolutionListPageContext({ filterType: 'unknown' });
      } catch (err) {
        expect(err).toEqual(new Error());
      }
    });
  });

  describe('getSolutionsForSelectedCapabilities', () => {
    afterEach(() => {
      postData.mockReset();
      createContext.createSolutionListPageContext.mockReset();
    });

    it('should call postData once with the correct params when capabilitiesSelected is "all"', async () => {
      postData
        .mockResolvedValueOnce({ data: mockedSolutionData });

      await getSolutionsForSelectedCapabilities({ capabilitiesSelected: 'all' });

      expect(postData.mock.calls.length).toEqual(1);
      expect(postData).toHaveBeenCalledWith({
        endpoint: `${buyingCatalogueApiHost}/api/v1/Solutions`,
        body: {
          capabilities: [],
        },
        logger,
      });
    });

    it('should call postData once with the correct params when capabilities are selected', async () => {
      postData
        .mockResolvedValueOnce({ data: mockedSolutionData });

      await getSolutionsForSelectedCapabilities({ capabilitiesSelected: 'C1+C2' });
      expect(postData.mock.calls.length).toEqual(1);
      expect(postData).toHaveBeenCalledWith({
        endpoint: `${buyingCatalogueApiHost}/api/v1/Solutions`,
        body: { capabilities: [{ reference: 'C1' }, { reference: 'C2' }] },
        logger,
      });
    });

    it('should call createSolutionListPageContext once with the correct params', async () => {
      postData
        .mockResolvedValueOnce({ data: mockedSolutionData });
      createContext.createSolutionListPageContext
        .mockResolvedValueOnce();

      await getSolutionsForSelectedCapabilities({ capabilitiesSelected: 'C1+C2' });

      expect(createContext.createSolutionListPageContext.mock.calls.length).toEqual(1);
      expect(createContext.createSolutionListPageContext).toHaveBeenCalledWith({
        filterType: 'capabilities-selector',
        capabilitiesSelected: ['C1', 'C2'],
        solutionListManifest: capabilitiesSelectorContent,
        solutionsData: mockedSolutionData.solutions,
      });
    });
  });
});
