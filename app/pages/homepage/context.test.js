import content from './manifest.json';
import { getHomepageContext } from './context';

describe('homepage - context', () => {
  it('should return the content from the manifest and showAdminTile as false when user is not provided', () => {
    const expectedContext = {
      ...content,
      showAdminTile: false,
    };

    const context = getHomepageContext({});

    expect(context).toEqual(expectedContext);
  });

  it('should return the content from the manifest and showAdminTile as false if organisation is not provided in user', () => {
    const expectedContext = {
      ...content,
      showAdminTile: false,
    };

    const context = getHomepageContext({ user: { name: 'some-name' } });

    expect(context).toEqual(expectedContext);
  });

  it('should return the content from the manifest and showAdminTile as true if organisation claim is provided in user', () => {
    const expectedContext = {
      ...content,
      showAdminTile: true,
    };

    const context = getHomepageContext({ user: { organisation: 'view' } });

    expect(context).toEqual(expectedContext);
  });
});
