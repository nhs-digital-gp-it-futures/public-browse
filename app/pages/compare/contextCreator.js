import manifest from './manifest.json';

export const getContext = () => ({
  ...manifest,
  compareButtonHref: '/compare/document',
});
