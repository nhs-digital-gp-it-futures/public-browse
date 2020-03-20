import { getPublicSolutionById } from './controller';
import * as apiProvider from '../../apiProvider';

jest.mock('../../apiProvider', () => ({
  getData: jest.fn(),
}));

const mockedSolutionData = {
  id: '100000-001',
  name: 'Write on Time',
  supplierName: 'Really Kool Corporation',
  isFoundation: true,
  lastUpdated: '1996-03-15T10:00:00',
  sections: {
    'some-section': {
      answers: {},
    },
  },
};

describe('view-solution controller', () => {
  describe('getPublicSolutionById', () => {
    afterEach(() => {
      apiProvider.getData.mockReset();
    });

    it('should call getData once with the correct params', async () => {
      apiProvider.getData
        .mockResolvedValueOnce(mockedSolutionData);

      await getPublicSolutionById({ solutionId: '100000-001' });
      expect(apiProvider.getData.mock.calls.length).toEqual(1);
      expect(apiProvider.getData.mock.calls[0].length).toEqual(1);
      expect(Object.keys(apiProvider.getData.mock.calls[0][0]).length).toEqual(2);
      expect(apiProvider.getData.mock.calls[0][0].endpointLocator).toBe('getPublicSolutionById');
      expect(Object.keys(apiProvider.getData.mock.calls[0][0].options).length).toEqual(1);
      expect(apiProvider.getData.mock.calls[0][0].options.solutionId).toBe('100000-001');
    });

    it('should return the context when preview data is returned by getData', async () => {
      const expectedContext = {
        solutionHeader: {
          id: '100000-001',
          name: 'Write on Time',
          supplierName: 'Really Kool Corporation',
          isFoundation: true,
          lastUpdated: '1996-03-15T10:00:00',
        },
        sections: {
          'some-section': {
            answers: {},
          },
        },
      };

      apiProvider.getData
        .mockResolvedValueOnce(mockedSolutionData);
      const context = await getPublicSolutionById({ solutionId: '100000-001' });
      expect(context).toEqual(expectedContext);
    });

    it('should throw an error when no data is returned from getData', async () => {
      apiProvider.getData
        .mockResolvedValueOnce();
      try {
        await getPublicSolutionById({ solutionId: 'some-solution-id' });
      } catch (err) {
        expect(err).toEqual(new Error('No data returned'));
      }
    });
  });
});
