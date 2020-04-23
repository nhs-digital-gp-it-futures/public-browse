import { getContext } from './contextCreator';
import manifest from './manifest.json';

describe('getContext for compare', () => {
  it('should add manifest with parameters', () => {
    const context = getContext();
    expect(context.backLinkText).toEqual(manifest.backLinkText);
    expect(context.title).toEqual(manifest.title);
    expect(context.description).toEqual(manifest.description);
    expect(context.compareButtonText).toEqual(manifest.compareButtonText);
  });

  it('should add compareButtonHref', () => {
    const context = getContext();
    expect(context.compareButtonHref).toEqual('/compare/document');
  });
});
