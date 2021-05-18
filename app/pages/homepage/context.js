import content from './manifest.json';
import { buyingCatalogueAdminHost, orderFormHost } from '../../config';

export const getHomepageContext = ({ user }) => ({
  ...content,
  showAdminTile: !!(user && user.organisation && user.organisation.toLowerCase() === 'manage'),
  adminUrl: `${buyingCatalogueAdminHost}/organisations`,
  orderFormUrl: orderFormHost,
});
