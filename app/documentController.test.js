import { getDocument, ErrorContext } from 'buying-catalogue-library';
import { getDocumentByFileName } from './documentController';
import { logger } from './logger';

jest.mock('buying-catalogue-library');

const pipe = jest.fn();
const setHeader = jest.fn();

describe('Document controller', () => {
  describe('getDocumentByFileName', () => {
    beforeEach(() => {
      getDocument
        .mockResolvedValue({ data: { pipe } });
    });

    afterEach(() => {
      getDocument.mockReset();
      pipe.mockReset();
      setHeader.mockReset();
    });

    it('should call getDocument once with the correct params when solutionId is passed in', async () => {
      await getDocumentByFileName({
        res: { setHeader },
        documentName: 'a-document.pdf',
        contentType: 'application/pdf',
        solutionId: 'solution-id',
      });

      expect(getDocument.mock.calls.length).toEqual(1);
      expect(getDocument).toHaveBeenCalledWith({
        endpoint: 'http://localhost:5101/api/v1/Solutions/solution-id/documents/a-document.pdf',
        logger,
      });
    });

    it('should call getDocument once with the correct params when no solutionId is passed in', async () => {
      await getDocumentByFileName({
        res: { setHeader },
        documentName: 'a-document.pdf',
        contentType: 'application/pdf',
      });

      expect(getDocument.mock.calls.length).toEqual(1);
      expect(getDocument).toHaveBeenCalledWith({
        endpoint: 'http://localhost:5101/api/v1/documents/a-document.pdf',
        logger,
      });
    });

    describe('no error from getDocument', () => {
      it('should call setHeader once with the content type', async () => {
        await getDocumentByFileName({
          res: { setHeader },
          documentName: 'a-document.pdf',
          contentType: 'application/pdf',
        });

        expect(setHeader.mock.calls.length).toEqual(1);
        expect(setHeader).toHaveBeenCalledWith('Content-type', 'application/pdf');
      });

      it('should call res.data.pipe once with res', async () => {
        await getDocumentByFileName({
          res: { setHeader },
          documentName: 'a-document.pdf',
          contentType: 'application/pdf',
        });

        expect(pipe.mock.calls.length).toEqual(1);
        expect(pipe).toHaveBeenCalledWith({ setHeader });
      });
    });

    describe('404 error from getDocument', () => {
      it('should not call setHeader', async () => {
        getDocument
          .mockRejectedValue({ response: { status: 404 } });
        try {
          await getDocumentByFileName({
            res: { setHeader },
            documentName: 'a-document.pdf',
            contentType: 'application/pdf',
          });
        } catch (err) {
          expect(setHeader.mock.calls.length).toEqual(0);
        }
      });

      it('should throw new ErrorContext', async () => {
        getDocument
          .mockRejectedValue({ response: { status: 404 } });
        try {
          await getDocumentByFileName({
            res: { setHeader },
            documentName: 'a-document.pdf',
            contentType: 'application/pdf',
          });
        } catch (err) {
          expect(err).toBeInstanceOf(ErrorContext);
          expect(err.status).toEqual(404);
          expect(err.backLinkText).toEqual('Back');
          expect(err.backLinkHref).toEqual('/');
          expect(err.title).toEqual('Error');
          expect(err.description).toEqual('Document not found');
        }
      });
    });

    describe('non-404 error from getDocument', () => {
      it('should not call setHeader', async () => {
        getDocument
          .mockRejectedValue({ response: { status: 500 } });
        try {
          await getDocumentByFileName({
            res: { setHeader },
            documentName: 'a-document.pdf',
            contentType: 'application/pdf',
          });
        } catch (err) {
          expect(setHeader.mock.calls.length).toEqual(0);
        }
      });

      it('should throw error', async () => {
        getDocument
          .mockRejectedValue({ response: { status: 500 } });
        try {
          await getDocumentByFileName({
            res: { setHeader },
            documentName: 'a-document.pdf',
            contentType: 'application/pdf',
          });
        } catch (err) {
          expect(err).toEqual({ response: { status: 500 } });
        }
      });
    });
  });
});
