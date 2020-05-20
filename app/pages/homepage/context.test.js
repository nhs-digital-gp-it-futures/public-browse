import content from './manifest.json';
import { getHomepageContext } from './context';
import { buyingCatalogueAdminHost, orderFormHost } from '../../config';

describe('homepage - context', () => {
  it('should return the content, orderFormUrl, adminUrl and showAdminTile as false when user is not provided', () => {
    const expectedContext = {
      ...content,
      showAdminTile: false,
      adminUrl: `${buyingCatalogueAdminHost}/organisations`,
      orderFormUrl: orderFormHost,
    };

    const context = getHomepageContext({});

    expect(context).toEqual(expectedContext);
  });

  it('should return the content, orderFormUrl, adminUrl and showAdminTile as false if organisation is not provided in user', () => {
    const expectedContext = {
      ...content,
      showAdminTile: false,
      adminUrl: `${buyingCatalogueAdminHost}/organisations`,
      orderFormUrl: orderFormHost,
    };

    const context = getHomepageContext({ user: { name: 'some-name' } });

    expect(context).toEqual(expectedContext);
  });

  it('should return the content, orderFormUrl, adminUrl and showAdminTile as true if organisation claim is manage', () => {
    const expectedContext = {
      ...content,
      showAdminTile: true,
      adminUrl: `${buyingCatalogueAdminHost}/organisations`,
      orderFormUrl: orderFormHost,
    };

    const context = getHomepageContext({ user: { organisation: 'manage' } });

    expect(context).toEqual(expectedContext);
  });

  it('should return the content, orderFormUrl, adminUrl and showAdminTile as false if organisation claim is view', () => {
    const expectedContext = {
      ...content,
      showAdminTile: false,
      adminUrl: `${buyingCatalogueAdminHost}/organisations`,
      orderFormUrl: orderFormHost,
    };

    const context = getHomepageContext({ user: { organisation: 'view' } });

    expect(context).toEqual(expectedContext);
  });
});
