import fs from 'fs';
import path from 'path';
import { logger } from '../../../logger';

export const getSolutionListManifest = (type) => {
  const filePath = `/${type}/manifest.json`;

  if (!fs.existsSync(path.join(__dirname, filePath))) {
    logger.error(`No manifest found for filter type: ${type}`);
    throw new Error();
  }
  const manifestFileContent = fs.readFileSync(path.join(__dirname, filePath));
  const manifest = JSON.parse(manifestFileContent);
  return manifest;
};
