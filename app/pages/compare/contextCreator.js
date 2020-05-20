import manifest from './manifest.json';

export const getContext = () => ({
  ...manifest,
  compareButtonHref: '/solutions/compare/document',
});
