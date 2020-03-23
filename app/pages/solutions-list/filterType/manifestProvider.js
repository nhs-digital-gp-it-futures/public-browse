import fs from 'fs';
import path from 'path';

export const getSolutionListManifest = (type) => {
  const filePath = `/${type}/manifest.json`;

  if (!fs.existsSync(path.join(__dirname, filePath))) {
    throw new Error(`No manifest found for filter type: ${type}`);
  }
  const manifestFileContent = fs.readFileSync(path.join(__dirname, filePath));
  const manifest = JSON.parse(manifestFileContent);
  return manifest;
};
