import content from './manifest.json';
import config from '../config';

export const includesContext = {
  ...content,
  loginEnabled: config.loginEnabled,
};
