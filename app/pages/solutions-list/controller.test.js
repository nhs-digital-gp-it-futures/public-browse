import { getSolutionListPageContext, getSolutionsForSelectedCapabilities } from './controller';
import * as createContext from './context';
import * as apiProvider from '../../apiProvider';
import foundationContent from './filterType/foundation/manifest.json';
import capabilitiesSelectorContent from './filterType/capabilities-selector/manifest.json';

jest.mock('../../apiProvider', () => ({
  postData: jest.fn(),
  getData: jest.fn(),
}));

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
      apiProvider.getData.mockReset();
      createContext.createSolutionListPageContext.mockReset();
    });

    it('should call getData once with the correct params', async () => {
      apiProvider.getData
        .mockResolvedValueOnce(mockedSolutionData);

      await getSolutionListPageContext({ filterType: 'foundation' });
      expect(apiProvider.getData).toHaveBeenCalledWith({
        endpointLocator: 'getSolutionListData',
        options: { filterType: 'foundation' },
      });
    });

    it('should call createSolutionListPageContext once with the correct params', async () => {
      apiProvider.getData
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
      apiProvider.getData
        .mockResolvedValueOnce();
      try {
        await getSolutionListPageContext({ filterType: 'foundation' });
      } catch (err) {
        expect(err).toEqual(new Error('No endpoint found for filter type: foundation'));
      }
    });

    it('should throw an error when no data is returned from getSolutionListManifest', async () => {
      apiProvider.getData
        .mockResolvedValueOnce();
      try {
        await getSolutionListPageContext({ filterType: 'unknown' });
      } catch (err) {
        expect(err).toEqual(new Error('No manifest found for filter type: unknown'));
      }
    });
  });

  describe('getSolutionsForSelectedCapabilities', () => {
    afterEach(() => {
      apiProvider.postData.mockReset();
      createContext.createSolutionListPageContext.mockReset();
    });

    it('should call postData once with the correct params when capabilitiesSelected is "all"', async () => {
      apiProvider.postData
        .mockResolvedValueOnce({ data: mockedSolutionData });

      await getSolutionsForSelectedCapabilities({ capabilitiesSelected: 'all' });

      expect(apiProvider.postData.mock.calls.length).toEqual(1);
      expect(apiProvider.postData).toHaveBeenCalledWith({
        endpointLocator: 'postSelectedCapabilities',
        body: { capabilities: [] },
      });
    });

    it('should call postData once with the correct params when capabilities are selected', async () => {
      apiProvider.postData
        .mockResolvedValueOnce({ data: mockedSolutionData });

      await getSolutionsForSelectedCapabilities({ capabilitiesSelected: 'C1+C2' });
      expect(apiProvider.postData.mock.calls.length).toEqual(1);
      expect(apiProvider.postData).toHaveBeenCalledWith({
        endpointLocator: 'postSelectedCapabilities',
        body: { capabilities: [{ reference: 'C1' }, { reference: 'C2' }] },
      });
    });

    it('should call createSolutionListPageContext once with the correct params', async () => {
      apiProvider.postData
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
