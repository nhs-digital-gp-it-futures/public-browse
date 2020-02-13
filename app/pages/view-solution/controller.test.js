import { getPublicSolutionById, getDocument } from './controller';
import { ApiProvider } from '../../apiProvider';

jest.mock('../../apiProvider');

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

      ApiProvider.prototype.getPublicSolutionById.mockResolvedValue(mockedSolutionData);

      const context = await getPublicSolutionById('100000-001');

      expect(context).toEqual(expectedContext);
    });

    it('should throw an error when no data is returned from the ApiProvider', async () => {
      ApiProvider.prototype.getPublicSolutionById.mockResolvedValue({});

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
