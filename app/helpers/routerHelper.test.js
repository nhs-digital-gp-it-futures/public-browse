import { getCapabilitiesParam, determineContentType } from './routerHelper';

describe('routerHelper', () => {
  describe('getCapabilitiesParam', () => {
    it('returns all if no capabilities are sent', () => {
      expect(getCapabilitiesParam('')).toEqual('.all');
      expect(getCapabilitiesParam()).toEqual('.all');
      expect(getCapabilitiesParam([])).toEqual('.all');
    });

    it('returns the correct param string if one capability is sent', () => {
      expect(getCapabilitiesParam('C1')).toEqual('.C1');
      expect(getCapabilitiesParam('C14')).toEqual('.C14');
    });

    it('returns the correct param string if many capabilities are sent', () => {
      expect(getCapabilitiesParam(['C1', 'C2', 'C3'])).toEqual('.C1+C2+C3');
      expect(getCapabilitiesParam(['C14', 'C21', 'C7'])).toEqual('.C14+C21+C7');
    });
  });

  describe('determineContentType', () => {
    it('should return the content type as "application/pdf" if the document is called something.pdf', () => {
      expect(determineContentType('something.pdf')).toEqual('application/pdf');
    });

    it('should return the content type as "application/pdf" if the document is called somethingv1.1.pdf', () => {
      expect(determineContentType('something.pdf')).toEqual('application/pdf');
    });

    it('should return the content type as "application/pdf" if the document is called somethingv1.1.1.pdf', () => {
      expect(determineContentType('something.pdf')).toEqual('application/pdf');
    });
  });
});
