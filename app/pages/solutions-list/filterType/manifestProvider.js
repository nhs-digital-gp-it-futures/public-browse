import fs from 'fs';
import path from 'path';

export class ManifestProvider {
  getSolutionListManifest(type) {
    this.manifestFileContent = fs.readFileSync(path.join(__dirname, `/${type}/manifest.json`));
    this.manifest = JSON.parse(this.manifestFileContent);
    return this.manifest;
  }
}
