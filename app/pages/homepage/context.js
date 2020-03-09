import content from './manifest.json';

export const getHomepageContext = ({ user }) => ({
  ...content,
  showAdminTile: !!(user && user.organisation),
});
