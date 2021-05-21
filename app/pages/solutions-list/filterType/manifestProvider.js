import fs from 'fs';
import path from 'path';
import sanitize from 'sanitize-filename';
import { logger } from '../../../logger';

export const getSolutionListManifest = (type) => {
  const sanitizedType = sanitize(type);
  const filePath = `/${sanitizedType}/manifest.json`;

  if (!fs.existsSync(path.join(__dirname, filePath))) {
    logger.error(`No manifest found for filter type: ${sanitizedType}`);
    throw new Error();
  }

  const manifestFileContent = fs.readFileSync(path.join(__dirname, filePath));
  const manifest = JSON.parse(manifestFileContent);
  manifest.showDfocvcContent = type.toLowerCase() === 'dfocvc001';

  return manifest;
};
