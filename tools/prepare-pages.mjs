// Refresh the committed GitHub Pages root from the reproducible dist build.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'build-manifest.json'), 'utf8'));
const files = [...manifest.assets, ...(manifest.pageFiles || ['index.html', 'en/index.html']), 'robots.txt', 'sitemap.xml', '404.html', '.nojekyll'];
for (const file of files) {
  const from = path.resolve(root, 'dist', file);
  const to = path.resolve(root, file);
  if (!from.startsWith(path.join(root, 'dist') + path.sep) || !to.startsWith(root + path.sep)) throw new Error('Invalid publication path');
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}
console.log(`GitHub Pages root refreshed: ${files.length} files. Review and commit the changes before pushing.`);
