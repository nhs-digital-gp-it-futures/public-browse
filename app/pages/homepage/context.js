import content from './manifest.json';
import { buyingCatalogueAdminHost } from '../../config';

export const getHomepageContext = ({ user }) => ({
  ...content,
  showAdminTile: !!(user && user.organisation),
  adminUrl: `${buyingCatalogueAdminHost}/organisations`,
});
