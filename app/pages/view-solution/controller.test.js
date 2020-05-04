import { getData } from 'buying-catalogue-library';
import { getPublicSolutionById } from './controller';
import { logger } from '../../logger';
import { buyingCatalogueApiHost } from '../../config';

jest.mock('buying-catalogue-library');

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
      getData.mockReset();
    });

    it('should call getData once with the correct params', async () => {
      getData
        .mockResolvedValueOnce(mockedSolutionData);

      await getPublicSolutionById({ solutionId: '100000-001' });
      expect(getData).toHaveBeenCalledWith({
        endpoint: `${buyingCatalogueApiHost}/api/v1/Solutions/100000-001/Public`,
        logger,
      });
    });

    it('should return the context when preview data is returned by getData', async () => {
      const expectedContext = {
        title: 'Write on Time',
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

      getData
        .mockResolvedValueOnce(mockedSolutionData);
      const context = await getPublicSolutionById({ solutionId: '100000-001' });
      expect(context).toEqual(expectedContext);
    });

    it('should throw an error when no data is returned from getData', async () => {
      getData
        .mockResolvedValueOnce();
      try {
        await getPublicSolutionById({ solutionId: 'some-solution-id' });
      } catch (err) {
        expect(err).toEqual(new Error());
      }
    });
  });
});
