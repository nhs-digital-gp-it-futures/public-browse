import fs from 'fs';

const path = require('path');

export class ManifestProvider {
  getSolutionListManifest(type) {
    this.manifestFileContent = fs.readFileSync(path.join(__dirname, `/${type}/manifest.json`));
    this.manifest = JSON.parse(this.manifestFileContent);
    return this.manifest;
  }
}
