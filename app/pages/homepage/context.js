import content from './manifest.json';
import { buyingCatalogueAdminHost, orderFormHost } from '../../config';

export const getHomepageContext = ({ req }) => ({
  ...content,
  showAdminTile: !!(req.user && req.user.organisation && req.user.organisation.toLowerCase() === 'manage'),
  adminUrl: `${buyingCatalogueAdminHost}/organisations`,
  orderFormUrl: orderFormHost,
});
