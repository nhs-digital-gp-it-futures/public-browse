import { getPublicSolutionById, getDocument } from './controller';
import { ApiProvider } from '../../apiProvider';
import * as apiProvider from '../../apiProvider2';

jest.mock('../../apiProvider');
jest.mock('../../apiProvider2', () => ({
  getData: jest.fn(),
}));

describe('view-solution controller', () => {
  describe('getPublicSolutionById', () => {
    it('should return the context when preview data is returned by the ApiProvider', async () => {
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

      const mockedSolutionData = {
        data: {
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
        },
      };

      apiProvider.getData
        .mockReturnValueOnce(mockedSolutionData);
      const context = await getPublicSolutionById({ solutionId: '100000-001' });
      expect(context).toEqual(expectedContext);
    });

    it('should throw an error when no data is returned from the ApiProvider', async () => {
      apiProvider.getData
        .mockReturnValueOnce({});
      try {
        await getPublicSolutionById('some-solution-id');
      } catch (err) {
        expect(err).toEqual(new Error('No data returned'));
      }
    });
  });

  describe('getDocument', () => {
    it('should return the document when a document is returned by the ApiProvider', async () => {
      const expectedDocument = 'Hello';

      ApiProvider.prototype.getDocument.mockResolvedValue(expectedDocument);

      const document = await getDocument({ solutionId: 'some-solution-id', documentName: 'some-document-name' });

      expect(document).toEqual(expectedDocument);
    });
  });
});
