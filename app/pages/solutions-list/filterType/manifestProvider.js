import fs from 'fs';
import path from 'path';
import { ErrorContext } from 'buying-catalogue-library';

export const getSolutionListManifest = (type) => {
  const filePath = `/${type}/manifest.json`;

  if (!fs.existsSync(path.join(__dirname, filePath))) {
    throw new ErrorContext({
      status: 404,
      description: `No manifest found for filter type: ${type}`,
    });
  }
  const manifestFileContent = fs.readFileSync(path.join(__dirname, filePath));
  const manifest = JSON.parse(manifestFileContent);
  return manifest;
};
