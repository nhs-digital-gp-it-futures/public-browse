import { getPublicSolutionById } from './controller';
import * as apiProvider from '../../apiProvider2';

jest.mock('../../apiProvider2', () => ({
  getData: jest.fn(),
  getDocument: jest.fn(),
}));

describe('view-solution controller', () => {
  describe('getPublicSolutionById', () => {
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

      apiProvider.getData
        .mockReturnValueOnce(mockedSolutionData);
      const context = await getPublicSolutionById({ solutionId: '100000-001' });
      expect(context).toEqual(expectedContext);
    });

    it('should throw an error when no data is returned from getData', async () => {
      apiProvider.getData
        .mockReturnValueOnce();
      try {
        await getPublicSolutionById({ solutionId: 'some-solution-id' });
      } catch (err) {
        expect(err).toEqual(new Error('No data returned'));
      }
    });
  });

  describe('getDocument', () => {
    it('should return the document when a document is returned by getData', async () => {
      const expectedDocument = 'Hello';

      apiProvider.getDocument
        .mockReturnValueOnce(expectedDocument);

      const document = await apiProvider.getDocument({ solutionId: 'some-solution-id', documentName: 'some-document-name' });

      expect(document).toEqual(expectedDocument);
    });
  });
});
